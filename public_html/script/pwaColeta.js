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

var ids = function () {


};

window.onload = function () {
    startTime();
    components.btnNovaLinha().click(function () {
        var rowCount = $('#tblColeta > tbody > tr').length;

        if (rowCount === 1) {
            components.btnDelLinha().attr("disabled", true);
            components.btnDelLinha().attr("disabled", false);
        }

        if (rowCount > 5) {
            $(this).attr("disabled", true);
            return;
        }
        $.get('row_coleta.html', function (data) {
            $('#tblColeta > tbody:last-child').append(data);
            var randomId = parseInt(Math.random() * 1000);
            var divId = 'idDiv' + randomId;
            var playId = 'imgPlay' + randomId;
            var tempoId = 'spanTempo' + randomId;

            $('#id_div_inicial').attr('id', divId);
            $('#id_play_inicial').attr('id', playId);
            $('#spanTempo').attr('id', tempoId);


            $('table tr img').on('click', function (e) {

            });



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
            if (rowCount < 6) {
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

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var fiveMinutes = 60 * 5;

    var rowIndex = $('table tr img').closest('td').parent()[0].sectionRowIndex;
    $('table tr span').closest('td').parent()[rowIndex].children[5].children[0].innerHTML = Math.random() * 1000;

    var display = $('#time');
    startTimer(fiveMinutes, display);
});