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
                addPrimaryKey(['idAmostra']);

        return schemaConfig;
    };

    return {
        schemaBuilder: schemaBuilder
    };

}();

function salvarDados(storageObj, tabela) {
    try {
        bdConfigs.schemaBuilder().connect().then(function (db) {
            var tbl_bd = db.getSchema().table(tabela);
            var newRow = tbl_bd.createRow(storageObj);
            return db.insertOrReplace().into(tbl_bd).values([newRow]).exec();
        });
    } catch (e) {
        console.error(e);
    }
}
;

function buscarDados(app) {
    bdConfigs.schemaBuilder().connect().then(function (db) {
        return db.select().from(db.getSchema().table('tbl_bd')).exec();
    }).then(function (results) {
        results.forEach(function (row) {
            var jsonObject = JSON.parse(row['jsonBd']);
        });
    });
}