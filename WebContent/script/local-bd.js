
var db = null;

$(function () {
    main().then(function () {
        console.log('BD INICIADO');
    });
});


function main() {
    return coletaSchema.db.getSchemaBuilder().connect({
        storeType: lf.schema.DataStoreType.INDEXED_DB
    }).then(function (database) {
        db = database;
    });
}


var salvarDados = function (storageObj, tabela) {
    try {
        var tbl = db.getSchema().table(tabela);
        if (storageObj instanceof Array) {
            var rows = storageObj.map(function (obj) {
                return tbl.createRow(obj);
            });
        }
        db.insert().into(tbl).values(rows).exec();
    } catch (e) {
        throw e;
    }
};

var apagarDados = function (tabela) {
    try {
        db.delete().from(db.getSchema().table(tabela)).exec();
    } catch (e) {
        throw e;
    }
};

var buscarDadosAmostrador = function () {
    var tblAmostradores = db.getSchema().table('amostradores');
    var query = db.select(tblAmostradores.idAmostrador, tblAmostradores.nomeAmostrador).
            from(tblAmostradores);
    return query.exec();
};

var buscarDadosLojas = function (idAmostrador) {
    var tblLojas = db.getSchema().table('lojas');
    var tblAmostradoresLojasUnidades = db.getSchema().table('amostradores_lojas_unidades');
    var query = db.select(tblLojas.idLoja, tblLojas.nomeLoja).
            from(tblLojas).
            innerJoin(tblAmostradoresLojasUnidades, tblAmostradoresLojasUnidades.idLoja.eq(tblLojas.idLoja)).
            where(tblAmostradoresLojasUnidades.idAmostrador.eq(idAmostrador)).
            groupBy(tblLojas.idLoja);
    return query.exec();
};

var buscarDadosUnidades = function (idAmostrador, idLoja) {
    var tblUnidades = db.getSchema().table('unidades');
    var tblAmostradoresLojasUnidades = db.getSchema().table('amostradores_lojas_unidades');
    var query = db.select(tblUnidades.idUnidade, tblUnidades.nomeUnidade).
            from(tblUnidades).
            innerJoin(tblAmostradoresLojasUnidades, tblAmostradoresLojasUnidades.idUnidade.eq(tblUnidades.idUnidade)).
            where(lf.op.and(tblAmostradoresLojasUnidades.idAmostrador.eq(idAmostrador), tblAmostradoresLojasUnidades.idLoja.eq(idLoja))).
            groupBy(tblUnidades.idUnidade, tblUnidades.nomeUnidade);
    return query.exec();
};

var buscarDadosFuncionarios = function (idUnidade) {
    var tblFuncionarios = db.getSchema().table('funcionarios');
    var query = db.select(tblFuncionarios.idFuncionario, tblFuncionarios.nomeFuncionario).
            from(tblFuncionarios).
            where(tblFuncionarios.idUnidade.eq(idUnidade));
    return query.exec();
};

var buscarDadosProdutos = function (idLoja) {
    var tblProdutos = db.getSchema().table('produtos');
    var tblLojasProdutosAtividades = db.getSchema().table('lojas_produtos_atividades');
    var query = db.select(tblProdutos.idProduto, tblProdutos.nomeProduto).
            from(tblProdutos).innerJoin(tblLojasProdutosAtividades, tblLojasProdutosAtividades.idProduto.eq(tblProdutos.idProduto)).
            where(tblLojasProdutosAtividades.idLoja.eq(idLoja)).
            groupBy(tblProdutos.idProduto, tblProdutos.nomeProduto);
    return query.exec();
};

var buscarDadosAtividades = function (idLoja, idProduto) {
    var tblAtividades = db.getSchema().table('atividades');
    var tblLojasProdutosAtividades = db.getSchema().table('lojas_produtos_atividades');
    var query = db.select(tblAtividades.idAtividade, tblAtividades.nomeAtividade).
            from(tblAtividades).
            innerJoin(tblLojasProdutosAtividades, tblLojasProdutosAtividades.idAtividade.eq(tblAtividades.idAtividade)).
            where(lf.op.and(tblLojasProdutosAtividades.idLoja.eq(idLoja), tblLojasProdutosAtividades.idProduto.eq(idProduto))).
            groupBy(tblAtividades.idAtividade, tblAtividades.nomeAtividade);
    return query.exec();
};

var buscarDadosColetaAmostra = function () {
    var tblAmostra = db.getSchema().table('coleta_amostra');
    var query = db.select().from(tblAmostra);
    return query.exec();
};
