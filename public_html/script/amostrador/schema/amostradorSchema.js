var salvarAmostrador = function (valores) {
    var tbl = db.getSchema().table('amostradores');
    if (valores instanceof Array) {
        var rows = valores.map(function (obj) {
            return tbl.createRow(obj);
        });
    }
    
    salvarDados(rows, tbl);
};

