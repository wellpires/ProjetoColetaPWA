var bdConfigs = function () {
    var schemaBuilder = function () {
        var schemaConfig = lf.schema.create('SYSNAC_LOCAL', 1);
        schemaConfig.createTable('amostradores').
                addColumn('idAmostrador', lf.Type.INTEGER).
                addColumn('nomeAmostrador', lf.Type.STRING).
                addPrimaryKey(['idAmostrador']);

        schemaConfig.createTable('lojas').
                addColumn('idLoja', lf.Type.INTEGER).
                addColumn('nomeLoja', lf.Type.STRING).
                addPrimaryKey(['idLoja']);

        schemaConfig.createTable('produtos').
                addColumn('idProduto', lf.Type.INTEGER).
                addColumn('nomeProduto', lf.Type.STRING).
                addColumn('atividade', lf.Type.STRING).
                addColumn('idLoja', lf.Type.INTEGER).
                addPrimaryKey(['idProduto']);

        schemaConfig.createTable('unidades').
                addColumn('idUnidade', lf.Type.INTEGER).
                addColumn('nomeUnidade', lf.Type.STRING).
                addColumn('idAmostrador', lf.Type.INTEGER).
                addColumn('idLoja', lf.Type.INTEGER).
                addPrimaryKey(['idUnidade']);

        schemaConfig.createTable('funcionarios').
                addColumn('idFuncionario', lf.Type.INTEGER).
                addColumn('nomeFuncionario', lf.Type.STRING).
                addColumn('cargo', lf.Type.STRING).
                addColumn('idUnidade', lf.Type.INTEGER).
                addPrimaryKey(['idFuncionario']);

        schemaConfig.createTable('coleta_amostra').
                addColumn('idAmostra', lf.Type.INTEGER).
                addColumn('amostrador', lf.Type.STRING).
                addColumn('loja', lf.Type.STRING).
                addColumn('unidade', lf.Type.STRING).
                addColumn('dataColeta', lf.Type.DATE_TIME).
                addColumn('horaColeta', lf.Type.DATE_TIME).
                addColumn('horaReal', lf.Type.DATE_TIME).
                addColumn('produto', lf.Type.STRING).
                addColumn('atividade', lf.Type.STRING).
                addColumn('statusAmostra', lf.Type.STRING).
                addPrimaryKey(['idAmostra'], true);

        return schemaConfig;
    };

    return {
        schemaBuilder: schemaBuilder
    };

}();

var salvarDados = function (storageObj, tabela) {
    bdConfigs.schemaBuilder().connect().then(function (db) {
        var tbl_bd = db.getSchema().table(tabela);
        if (storageObj instanceof Array) {
            for (var i = 0; i < storageObj.length; i++) {
                var newRow = tbl_bd.createRow(storageObj[i]);
                db.insert().into(tbl_bd).values([newRow]).exec();
            }
            return;
        }
        var newRow = tbl_bd.createRow(storageObj);
        return db.insertOrReplace().into(tbl_bd).values([newRow]).exec();
    });
};

var apagarDados = function () {
    return bdConfigs.schemaBuilder().connect().then(function (db) {
        db.delete().from(db.getSchema().table('amostradores')).exec();
        db.delete().from(db.getSchema().table('lojas')).exec();
        db.delete().from(db.getSchema().table('produtos')).exec();
        db.delete().from(db.getSchema().table('unidades')).exec();
        db.delete().from(db.getSchema().table('funcionarios')).exec();
        db.delete().from(db.getSchema().table('coleta_amostra')).exec();
    });
};

var buscarDadosAmostrador = function () {
    return bdConfigs.schemaBuilder().connect().then(function (db) {
        var tblAmostradores = db.getSchema().table('amostradores');
        var query = db.select(tblAmostradores.idAmostrador, tblAmostradores.nomeAmostrador).
                from(tblAmostradores);
        return query.exec();
    });
}

var buscarDadosLojas = function (idAmostrador) {
    return bdConfigs.schemaBuilder().connect().then(function (db) {
        var tblLojas = db.getSchema().table('lojas');
        var tblUnidades = db.getSchema().table('unidades');
        var query = db.select(tblLojas.idLoja, tblLojas.nomeLoja).
                from(tblLojas).
                innerJoin(tblUnidades, tblUnidades.idLoja.eq(tblLojas.idLoja)).
                where(tblUnidades.idAmostrador.eq(idAmostrador)).
                groupBy(tblLojas.idLoja, tblLojas.nomeLoja);
        return query.exec();
    });
};

var buscarDadosUnidades = function (idAmostrador, idLoja) {
    return bdConfigs.schemaBuilder().connect().then(function (db) {

        var tblUnidades = db.getSchema().table('unidades');
        var query = db.select(tblUnidades.idUnidade, tblUnidades.nomeUnidade).
                from(tblUnidades).
                where(lf.op.and(tblUnidades.idAmostrador.eq(idAmostrador), tblUnidades.idLoja.eq(idLoja))).
                groupBy(tblUnidades.idUnidade, tblUnidades.nomeUnidade);
        return query.exec();
    });
};

var buscarDadosFuncionarios = function (idAmostrador, idLoja, idUnidade) {
    return bdConfigs.schemaBuilder().connect().then(function (db) {
        var tblFuncionarios = db.getSchema().table('funcionarios');
        var tblUnidades = db.getSchema().table('unidades');
        var query = db.select(tblFuncionarios.idFuncionario, tblFuncionarios.nomeFuncionario).
                from(tblFuncionarios).
                innerJoin(tblUnidades, tblUnidades.idUnidade.eq(tblFuncionarios.idUnidade)).
                where(lf.op.and(tblUnidades.idAmostrador.eq(idAmostrador), tblUnidades.idLoja.eq(idLoja), tblUnidades.idUnidade.eq(idUnidade))).
                groupBy(tblFuncionarios.idFuncionario, tblFuncionarios.nomeFuncionario);
        return query.exec();
    });
};

var buscarDadosProdutosAtividades = function (idLoja) {
    return bdConfigs.schemaBuilder().connect().then(function (db) {
        var tblProdutos = db.getSchema().table('produtos');
        var query = db.select(tblProdutos.idProduto, tblProdutos.nomeProduto, tblProdutos.atividade).
                from(tblProdutos).
                where(tblProdutos.idLoja.eq(idLoja)).
                groupBy(tblProdutos.idProduto, tblProdutos.nomeProduto, tblProdutos.atividade);
        return query.exec();
    });
};

var buscarDadosColetaAmostra = function () {
    return bdConfigs.schemaBuilder().connect().then(function (db) {
        var tblAmostra = db.getSchema().table('coleta_amostra');
        var query = db.select().from(tblAmostra);
        return query.exec();
    });
};
