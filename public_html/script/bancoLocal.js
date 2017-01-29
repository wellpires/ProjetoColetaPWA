var bancoLocal = function () {
    var schemaBuilder = function () {
        var schemaConfig = lf.schema.create('BancoColeta', 1);
        schemaConfig.createTable('tbl_coleta').
            addColumn('id', lf.Type.INTEGER).
            addColumn('jsonWeather', lf.Type.STRING).
            addPrimaryKey(['id'], true);
        return schemaConfig;
    };

    return {
        getSchemaBuilder: schemaBuilder
    };

}();

function salvarDados(weatherObj) {
    var todoDB = null;
    var tbl_weather = null;
    bancoLocal.schemaBuilder().connect().then(function (db) {
        todoDB = db;
        tbl_weather = db.getSchema().table('tbl_weather');
        var newRow = tbl_weather.createRow({'jsonWeather': weatherObj});
        return db.insertOrReplace().into(tbl_weather).values([newRow]).exec();
    });
};

function buscarDados(app) {
    bancoLocal.schemaBuilder().connect().then(function (db) {
        return db.select().from(db.getSchema().table('tbl_weather')).exec();
    }).then(function (results) {
        results.forEach(function (row) {
            var jsonObject = JSON.parse(row['jsonWeather']);
            app.updateForecastCard(jsonObject);
        });
    });
}