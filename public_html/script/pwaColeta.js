var components = function () {

    var func_info = function () {
        return $('#func_info');
    };

    var btnNovaLinha = function () {
        return $('#btnNovaLinha');
    };

    var txtHoraAtual = function () {
        return $('#txtHoraAtual');
    };

    var idCheckbox = function () {
        return $('.checkboxesClass');
    };

    var tblColeta = function () {
        return $('#tblColeta');
    };

    var btnIniciar = function () {
        return $('#btnIniciar');
    };

    var btnPausar = function () {
        return $('#btnPausar');
    };

    var btnParar = function () {
        return $('#btnParar');
    };

    var cbAmostrador = function () {
        return $('#cbAmostrador');
    }

    return{
        divFuncInfo: func_info,
        btnNovaLinha: btnNovaLinha,
        txtHoraAtual: txtHoraAtual,
        idCheckbox: idCheckbox,
        tblColeta: tblColeta,
        btnIniciar: btnIniciar,
        btnPausar: btnPausar,
        btnParar: btnParar,
        cbAmostrador: cbAmostrador
    };

}();

window.onload = function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('coleta-service-worker.js').then(function (registration) {
            console.log('Service Worker registered ', registration);
        }).catch(function (e) {
            console.log('ERRO ', e);
        });
    }

    var TEXTO_INICIAR = 'INICIAR';
    var TEXTO_PAUSAR = 'PAUSAR';

    startTime();

    components.cbAmostrador();

    components.btnNovaLinha().click(function () {
        var rowCount = $('#tblColeta > tbody > tr').length;

        if (rowCount === 1) {
            components.btnIniciar().attr("disabled", false);
        }

        if (rowCount > 5) {
            $(this).attr("disabled", true);
            return;
        }

        $.ajax({
            url: url,
            crossDomain: true,
            data: form,
            dataType: 'json',
            success: function (data) {
                console.log(data);
            },
            type: 'POST'
        }).done(function(){
            
        });

        $.get('row_coleta.html', function (data) {
            $('#tblColeta > tbody:last-child').append(data);
            var randomId = parseInt(Math.random() * 1000);
            var divId = 'idDiv' + randomId;
            var idBtnAcao = 'btnAcao' + randomId;
            var tempoId = 'spanTempo' + randomId;
            var deletarId = 'btnDeletar' + randomId;

            $('#id_div_inicial').attr('id', divId);
            $('#id_btn_inicial').attr('id', idBtnAcao);
            $('#id_btn_apagar').attr('id', deletarId);
            $('#spanTempo').attr('id', tempoId);

            var jqueryBtnAcao = '#' + idBtnAcao;
            $(jqueryBtnAcao).click(function (e) {
                $(jqueryBtnAcao).attr('value', 'REGISTRAR');
                var rowIndex = $('#tblColeta tr').index(e.target.parentNode.parentNode);
                var componentDisplay = undefined;
                var spanComponent = $('#tblColeta tr span');
                var buttonComponent = $('#tblColeta tr td button');
                if ($('table tr span')[rowIndex] === undefined) {
                    componentDisplay = spanComponent[1];
                } else {
                    componentDisplay = spanComponent[rowIndex];
                }

                if (buttonComponent[rowIndex] === undefined) {
                    buttonComponent[0].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                } else {
                    buttonComponent[rowIndex].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                }

                if (componentDisplay.innerHTML === '05:00') {
                    CountDown().Start(300000, componentDisplay);
                }

            });

            var jqueryBtnDeletar = '#' + deletarId;
            $(jqueryBtnDeletar).click(function () {
                $(this).parents('tr').remove();

                var rowCount = $('#tblColeta > tbody > tr').length;
                if (rowCount === 1) {
                    components.btnIniciar().attr("disabled", true);
                    components.btnNovaLinha().attr("disabled", false);
                }
                if (rowCount < 6) {
                    components.btnNovaLinha().attr("disabled", false);
                }
            });

        });
    });

    components.btnIniciar().click(function () {
        if (!confirm('Tem certeza?')) {
            return;
        }

        if (components.btnIniciar().val() === TEXTO_INICIAR) {
            components.btnIniciar().attr('value', TEXTO_PAUSAR);
            components.btnParar().attr("disabled", false);
            $('#tblColeta tr td button')[0].disabled = false;

            CountDown().Start(70000, $('#tblColeta tr td span')[0]);

        } else if (components.btnIniciar().val() === TEXTO_PAUSAR) {
            components.btnIniciar().attr('value', TEXTO_INICIAR);
            $('#tblColeta tr td button').attr('disabled', true);
            var id = setTimeout(function () {}, 0);
            while (id--) {
                clearTimeout(id);
            }
            $('#tblColeta tr td span').each(function (index, comp) {
                comp.innerHTML = '05:00';
            });

        }

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
    var t = setTimeout(startTime, 0);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    ;
    return i;
}

var timeout;

var CountDown = function () {

    var firstTime = false;
    // Length ms 
    var TimeOut = 10;
    // Interval ms
    var TimeGap = 1000;

    var CurrentTime = (new Date()).getTime();
    var EndTime = (new Date()).getTime() + TimeOut;

    var GuiTimer = null;

    var Running = false;

    var UpdateTimer = function () {
        // Run till timeout
        if (CurrentTime + TimeGap < EndTime) {
            timeout = setTimeout(UpdateTimer, TimeGap);
        }
        // Countdown if running
        if (Running) {
            CurrentTime += TimeGap;
            if (GuiTimer.innerHTML === '01:00') {
                GuiTimer.parentNode.parentNode.style.backgroundColor = 'red';
            }
        }
        // Update Gui
        var Time = new Date();
        Time.setTime(EndTime - CurrentTime);
        var Minutes = Time.getMinutes();
        var Seconds = Time.getSeconds();

        GuiTimer.innerHTML = (Minutes < 10 ? '0' : '') + Minutes + ':' + (Seconds < 10 ? '0' : '') + Seconds;
    };

    var Pause = function () {
        Running = false;
    };

    var Resume = function () {
        Running = true;
    };

    var Start = function (Timeout, componentDisplay) {
        Running = true;
        if (!firstTime) {
            GuiTimer = componentDisplay;
            TimeOut = Timeout;
            CurrentTime = (new Date()).getTime();
            EndTime = (new Date()).getTime() + TimeOut;
            firstTime = true;
            UpdateTimer();
        }
    };

    return {
        Pause: Pause,
        Resume: Resume,
        Start: Start
    };
};


var carregarFuncionarios = function () {

    var lstFuncionarios = [];

    for (var i = 0; i < 100; i++) {

//        var funcionario = function (idFuncionario) {
//            var idFuncionario
//            =
//        }

    }
    ;

}

//var cronometro = undefined;
//function startTimer(duration, display) {
//    var timer = duration;
//    var minutes;
//    var seconds;
//    cronometro = setInterval(function () {
//        minutes = parseInt(timer / 60, 10);
//        seconds = parseInt(timer % 60, 10);
//
//        minutes = minutes < 10 ? "0" + minutes : minutes;
//        seconds = seconds < 10 ? "0" + seconds : seconds;
//
//        if (display !== undefined) {
//            display.innerHTML = minutes + ":" + seconds;
//        }
//
//        if (--timer < 0) {
//            timer = duration;
//        }
//    }, 1000);
//}
//
//function iniciarTimer(display) {
//    var fiveMinutes = 5;
//    var minutos = 60 * fiveMinutes;
//    startTimer(minutos, display);
//}
//;