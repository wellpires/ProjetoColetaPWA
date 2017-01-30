var bdConfigs = function () {
    var schemaBuilder = function () {
        var schemaConfig = lf.schema.create('LocalDB', 1);
        schemaConfig.createTable('tbl_db').
            addColumn('id', lf.Type.INTEGER).
            addColumn('jsonDB', lf.Type.STRING).
            addPrimaryKey(['id'], true);
        return schemaConfig;
    };

    return {
        schemaBuilder: schemaBuilder
    };

}();

function salvarDados(storageObj) {
    var todoDB = null;
    var tbl_db = null;
    bdConfigs.schemaBuilder().connect().then(function (db) {
        todoDB = db;
        tbl_db = db.getSchema().table('tbl_db');
        var newRow = tbl_weather.createRow({'jsonDB': weatherObj});
        return db.insertOrReplace().into(tbl_db).values([newRow]).exec();
    });
};

function buscarDados(app) {
    bdConfigs.schemaBuilder().connect().then(function (db) {
        return db.select().from(db.getSchema().table('tbl_db')).exec();
    }).then(function (results) {
        results.forEach(function (row) {
            var jsonObject = JSON.parse(row['jsonDB']);
            app.updateForecastCard(jsonObject);
        });
    });
}