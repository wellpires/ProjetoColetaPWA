var components = function () {

    var func_info = function () {
        return $('#func_info');
    };

    var btnNovaLinha = function () {
        return $('#btnNovaLinha');
    };

    var btnDelLinha = function () {
        return $('#btnDelLinha');
    };

    var txtHoraAtual = function () {
        return $('#txtHoraAtual');
    };

    var idCheckbox = function () {
        return $('.checkboxesClass');
    };

    return{
        divFuncInfo: func_info,
        btnNovaLinha: btnNovaLinha,
        btnDelLinha: btnDelLinha,
        txtHoraAtual: txtHoraAtual,
        idCheckbox: idCheckbox
    };

}();

window.onload = function () {
    startTime();
    components.btnNovaLinha().click(function () {
        var rowCount = $('#tblColeta > tbody > tr').length;

        if (rowCount === 1) {
            components.btnDelLinha().prop("disabled", true);
            components.btnDelLinha().prop("disabled", false);
        }

        if (rowCount > 5) {
            $(this).prop("disabled", true);
            return;
        }
        $.get('row_coleta.html', function (data) {
            $('#tblColeta > tbody:last-child').append(data);
            var randomId = parseInt(Math.random() * 1000);
            var divId = 'idDiv' + randomId;
            var playId = 'imgPlay' + randomId;

            $('#id_div_inicial').attr('id', divId);
            $('#id_play_inicial').attr('id', playId);

        });
    });

    components.btnDelLinha().click(function () {
        $('input:checked').each(function () {
            $(this).parents('tr').remove();
            
            var rowCount = $('#tblColeta > tbody > tr').length;
            if (rowCount === 1) {
                components.btnDelLinha().attr('disabled', true);
                components.btnNovaLinha().attr("disabled", false);
            }
            if(rowCount < 6){
                components.btnNovaLinha().attr("disabled", false);
            }
        });
    });




};
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    components.txtHoraAtual().text(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    ;
    return i;
}