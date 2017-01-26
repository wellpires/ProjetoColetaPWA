var components = function () {

    var btnNovaLinha = function () {
        return document.getElementById('btnNovaLinha');
    };

    var func_info = function () {
        return $('#func_info');
    };

    var txtHoraAtual = function () {
        return document.getElementById('txtHoraAtual');
    };
    
    var imgDelete = function(){
        return document.getElementById('imgDelete');
    };

    return{
        btnNovaLinha: btnNovaLinha,
        divFuncInfo: func_info,
        txtHoraAtual: txtHoraAtual,
        imgDelete: imgDelete
    };

}();

window.onload = function () {
    startTime();
    components.btnNovaLinha().addEventListener('click', function () {
        $.get('row_coleta.html', function (data) {
            components.divFuncInfo().append(data);
        });
    });
    
    components.imgDelete().addEventListener('click', function(){
        $();
    });
    
};
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    components.txtHoraAtual().innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    ;
    return i;
}


