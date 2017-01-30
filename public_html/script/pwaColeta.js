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
        return $('#select_amostrador');
    };

    var cbLojas = function () {
        return $('#select_loja');
    };

    var cbUnidades = function () {
        return $('#select_unidade');
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
        cbAmostrador: cbAmostrador,
        cbLojas: cbLojas,
        cbUnidades: cbUnidades
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

    carregarAmostrador();

    components.btnNovaLinha().click(function () {
        var rowCount = $('#tblColeta > tbody > tr').length;

        if (rowCount === 1) {
            components.btnIniciar().attr("disabled", false);
        }

        if (rowCount > 5) {
            $(this).attr("disabled", true);
            return;
        }

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
            components.btnParar().attr("disabled", true);
            var id = setTimeout(function () {}, 0);
            while (id--) {
                clearTimeout(id);
            }
            $('#tblColeta tr td span').each(function (index, comp) {
                comp.innerHTML = '05:00';
            });

        }

    });

    components.cbAmostrador().change(function (event) {
        components.btnNovaLinha().attr('disabled', !combosPreenchidos());
        components.cbLojas().attr('disabled', !combosPreenchidos());
        components.cbUnidades().attr('disabled', !combosPreenchidos());
        components.cbLojas().val('');
        components.cbUnidades().val('');
        if (event.target.value === '') {
            return;
        }
        components.cbLojas().attr('disabled', false);
        carregarLojas();

    });

    components.cbLojas().change(function () {
        components.btnNovaLinha().attr('disabled', !combosPreenchidos());
        components.cbUnidades().attr('disabled', !combosPreenchidos());
        components.cbUnidades().val('');
        if (event.target.value === '') {
            return;
        }
        components.cbUnidades().attr('disabled', false);
        carregarUnidades();
    });

    components.cbUnidades().change(function () {
        components.btnNovaLinha().attr('disabled', !combosPreenchidos());
        if (event.target.value === '') {
            return;
        }
        carregarUnidades();
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

var carregarAmostrador = function () {

    var lstAmostrador = [];
    $select = components.cbAmostrador();

    for (var i = 0; i < 100; i++) {
        var amostrador = function (idAmostrador) {
            var idAmostrador = idAmostrador;
            var nomeAmostrador = 'Amostrador ' + idAmostrador;

            return{
                idAmostrador: idAmostrador,
                nomeAmostrador: nomeAmostrador
            };
        };

        lstAmostrador.push(amostrador(i));

    }
    ;

    $.each(lstAmostrador, function (index, object) {
        $('<option>').val(object.idAmostrador).text(object.nomeAmostrador).appendTo($select);
    });
};

var carregarLojas = function () {

    var lstLojas = [];
    $select = components.cbLojas();

    for (var i = 0; i < 100; i++) {
        var loja = function (idLoja) {
            var idLoja = idLoja;
            var nomeLoja = 'Loja ' + idLoja;

            return{
                idLoja: idLoja,
                nomeLoja: nomeLoja
            };
        };

        lstLojas.push(loja(i));

    }
    ;

    $.each(lstLojas, function (index, object) {
        $('<option>').val(object.idLoja).text(object.nomeLoja).appendTo($select);
    });

}

var carregarUnidades = function () {

    var lstUnidades = [];
    $select = components.cbUnidades();

    for (var i = 0; i < 100; i++) {
        var unidade = function (idUnidade) {
            var idUnidade = idUnidade;
            var nomeUnidade = 'Unidade ' + idUnidade;

            return{
                idUnidade: idUnidade,
                nomeUnidade: nomeUnidade
            };
        };

        lstUnidades.push(unidade(i));

    }
    ;

    $.each(lstUnidades, function (index, object) {
        $('<option>').val(object.idUnidade).text(object.nomeUnidade).appendTo($select);
    });

}


var combosPreenchidos = function () {

    var valorAmostrador = components.cbAmostrador().val();
    var valorLojas = components.cbLojas().val();
    var valorUnidades = components.cbUnidades().val();

    if (valorAmostrador === '' || valorLojas === '' || valorUnidades === '') {
        return false;
    }
    return true;

};

