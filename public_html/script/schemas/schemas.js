var coletaSchema = {db: {}};

coletaSchema.db.getSchemaBuilder = function () {
    var ds = lf.schema.create('SYSNAC_LOCAL', 1);
    ds.createTable('amostradores').
            addColumn('idAmostrador', lf.Type.INTEGER).
            addColumn('nomeAmostrador', lf.Type.STRING).
            addPrimaryKey(['idAmostrador']);

    ds.createTable('lojas').
            addColumn('idLoja', lf.Type.INTEGER).
            addColumn('nomeLoja', lf.Type.STRING).
            addPrimaryKey(['idLoja']);

    ds.createTable('produtos').
            addColumn('idProduto', lf.Type.INTEGER).
            addColumn('nomeProduto', lf.Type.STRING).
            addPrimaryKey(['idProduto']);

    ds.createTable('atividades').
            addColumn('idAtividade', lf.Type.INTEGER).
            addColumn('nomeAtividade', lf.Type.STRING).
            addPrimaryKey(['idAtividade']);

    ds.createTable('unidades').
            addColumn('idUnidade', lf.Type.INTEGER).
            addColumn('nomeUnidade', lf.Type.STRING).
            addColumn('idAmostrador', lf.Type.INTEGER).
            addColumn('idLoja', lf.Type.INTEGER).
            addPrimaryKey(['idUnidade']);

    ds.createTable('funcionarios').
            addColumn('idFuncionario', lf.Type.INTEGER).
            addColumn('nomeFuncionario', lf.Type.STRING).
//                addColumn('cargo', lf.Type.STRING). --> SERÁ ADICIONADO EM UMA VERSÃO FUTURA
            addColumn('idUnidade', lf.Type.INTEGER).
            addPrimaryKey(['idFuncionario']);

    ds.createTable('lojas_produtos_atividades').
            addColumn('codTeste', lf.Type.INTEGER).
            addColumn('idLoja', lf.Type.INTEGER).
            addColumn('idProduto', lf.Type.INTEGER).
            addColumn('idAtividade', lf.Type.INTEGER).
            addPrimaryKey(['codTeste'], true);

    ds.createTable('coleta_amostra').
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
            addColumn('funcionario', lf.Type.STRING).
            addPrimaryKey(['idAmostra'], true);
    return ds;
};

