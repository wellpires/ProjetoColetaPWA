var bdConfigs = function () {
    var schemaBuilder = function () {
        var schemaConfig = lf.schema.create('LocalBD', 1);
        schemaConfig.createTable('tbl_bd').
            addColumn('id', lf.Type.INTEGER).
            addColumn('jsonBd', lf.Type.STRING).
            addPrimaryKey(['id'], true);
        return schemaConfig;
    };

    return {
        schemaBuilder: schemaBuilder
    };

}();

function salvarDados(storageObj) {
    var todoDB = null;
    var tbl_bd = null;
    bdConfigs.schemaBuilder().connect().then(function (db) {
        todoDB = db;
        tbl_bd = db.getSchema().table('tbl_bd');
        var newRow = tbl_bd.createRow({'jsonBd': weatherObj});
        return db.insertOrReplace().into(tbl_bd).values([newRow]).exec();
    });
};

function buscarDados(app) {
    bdConfigs.schemaBuilder().connect().then(function (db) {
        return db.select().from(db.getSchema().table('tbl_bd')).exec();
    }).then(function (results) {
        results.forEach(function (row) {
            var jsonObject = JSON.parse(row['jsonBd']);
            app.updateForecastCard(jsonObject);
        });
    });
}