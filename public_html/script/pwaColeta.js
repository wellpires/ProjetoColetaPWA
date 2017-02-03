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
    };

    var btnSincronizar = function () {
        return $('#btnSincronizar');
    };

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
        cbUnidades: cbUnidades,
        btnSincronizar: btnSincronizar
    };

}();

var urls = function () {
    var ORIGEM = 'http://localhost:8080/ColetaWS/';
    var GET_BUSCAR_AMOSTRADORES = ORIGEM + 'buscarAmostrador';
    var GET_BUSCAR_LOJAS = ORIGEM + 'buscarLojas';
    var GET_BUSCAR_UNIDADES = ORIGEM + 'buscarUnidades';
    var GET_BUSCAR_FUNCIONARIOS = ORIGEM + 'buscarFuncionarios';
    var GET_BUSCAR_PRODUTOS_ATIVIDADES = ORIGEM + 'buscarProdutosAtividades';
    var POST_GRAVAR_COLETA = ORIGEM + 'gravarColeta';

    return{
        GET_BUSCAR_AMOSTRADORES: GET_BUSCAR_AMOSTRADORES,
        GET_BUSCAR_LOJAS: GET_BUSCAR_LOJAS,
        GET_BUSCAR_UNIDADES: GET_BUSCAR_UNIDADES,
        GET_BUSCAR_FUNCIONARIOS: GET_BUSCAR_FUNCIONARIOS,
        GET_BUSCAR_PRODUTOS_ATIVIDADES: GET_BUSCAR_PRODUTOS_ATIVIDADES,
        POST_GRAVAR_COLETA: POST_GRAVAR_COLETA
    };
}();

//====================================================================================================

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

        if (rowCount > 7) {
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
            var tamanhoFunci = $('#tblColeta tr td select').length;
            var cbFuncionario = $('#tblColeta tr td select')[tamanhoFunci - 3];
            var cbProduto = $('#tblColeta tr td select')[tamanhoFunci - 2];
            var cbAtividade = $('#tblColeta tr td select')[tamanhoFunci - 1];

            carregarFuncionarios(cbFuncionario);
            carregarProdutos(cbProduto, cbAtividade);

            var jqueryBtnAcao = '#' + idBtnAcao;
            $(jqueryBtnAcao).click(function (e) {
                $(jqueryBtnAcao).attr('value', 'REGISTRAR');
                var rowIndex = $('#tblColeta tr').index(e.target.parentNode.parentNode);
//                var componentDisplay = undefined;
//                var spanComponent = $('#tblColeta tr span');
                var buttonComponent = $('#tblColeta tr td button');
//                if ($('table tr span')[rowIndex] === undefined) {
//                    componentDisplay = spanComponent[1];
//                } else {
//                    componentDisplay = spanComponent[rowIndex];
//                }

                gravarDados(rowIndex - 1);


                if (buttonComponent[rowIndex] === undefined) {
                    buttonComponent[0].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                } else {
                    buttonComponent[rowIndex].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                }

//                if (componentDisplay.innerHTML === '05:00') {
//                    CountDown().Start(300000, componentDisplay);
//                }



            });

            var jqueryBtnDeletar = '#' + deletarId;
            $(jqueryBtnDeletar).click(function () {
                $(this).parents('tr').remove();

                var rowCount = $('#tblColeta > tbody > tr').length;
                if (rowCount === 1) {
                    components.btnIniciar().attr("disabled", true);
                    components.btnParar().attr("disabled", true);
                    components.btnIniciar().val(TEXTO_INICIAR);
                    components.btnNovaLinha().attr("disabled", false);
                    zerarContagemRegressiva();
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
            components.btnParar().attr('disabled', false);
            components.cbAmostrador().attr('disabled', true);
            components.cbLojas().attr('disabled', true);
            components.cbUnidades().attr('disabled', true);
            components.btnNovaLinha().attr('disabled', false);

            $('#tblColeta tr td button')[0].disabled = false;

            CountDown().Start(70000, $('#tblColeta tr td span'));

        } else if (components.btnIniciar().val() === TEXTO_PAUSAR) {
            components.btnIniciar().attr('value', TEXTO_INICIAR);
            $('#tblColeta tr td button').attr('disabled', true);
            components.btnParar().attr("disabled", true);
            zerarContagemRegressiva();
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

var zerarContagemRegressiva = function () {
    var id = setTimeout(function () {
    }, 0);
    while (id--) {
        clearTimeout(id);
    }
};

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

            for (var x in GuiTimer) {
                if ($.isNumeric(x) && GuiTimer[x].innerHTML === '01:00') {
                    GuiTimer[x].parentNode.parentNode.style.backgroundColor = 'red';
                }
            }

        }
        // Update Gui
        var Time = new Date();
        Time.setTime(EndTime - CurrentTime);
        var Minutes = Time.getMinutes();
        var Seconds = Time.getSeconds();

        for (var x in GuiTimer) {
            if ($.isNumeric(x)) {
                GuiTimer[x].innerHTML = (Minutes < 10 ? '0' : '') + Minutes + ':' + (Seconds < 10 ? '0' : '') + Seconds;
            }
        }

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

    $select = components.cbAmostrador();

    $.get(urls.GET_BUSCAR_AMOSTRADORES, function (data) {
        $.each(data, function (index, object) {
            $('<option>').val(object.idAmostrador).text(object.nomeAmostrador).appendTo($select);
        });
    });

};

var carregarLojas = function () {

    $select = components.cbLojas();

    $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');

    $.get(urls.GET_BUSCAR_LOJAS, {idAmostrador: components.cbAmostrador().val()}, function (data) {
        $.each(data, function (index, object) {
            $('<option>').val(object.idLoja).text(object.nomeLoja).appendTo($select);
        });
    });

};

var carregarUnidades = function () {

    $select = components.cbUnidades();

    $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');
    $.get(urls.GET_BUSCAR_UNIDADES, {'idLoja': components.cbLojas().val(), 'idAmostrador': components.cbAmostrador().val()}, function (data) {
        $.each(data, function (index, object) {
            $('<option>').val(object.idUnidade).text(object.nomeUnidade).appendTo($select);
        });
    });
};

var carregarFuncionarios = function (id) {

    $select = $(id);

    $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');
    $.get(urls.GET_BUSCAR_FUNCIONARIOS, {
        'idAmostrador': components.cbAmostrador().val(),
        'idLoja': components.cbLojas().val(),
        'idUnidade': components.cbUnidades().val()
    }, function (data) {
        $.each(data, function (index, object) {
            $('<option>').val(object.idFuncionario).text(object.nomeFuncionario).appendTo($select);
        });
    });

};


var carregarProdutos = function (cbProduto, cbAtividade) {

    cbProduto = $(cbProduto);
    cbAtividade = $(cbAtividade);

    cbProduto.find('option').remove().end().append('<option value="">Selecione</option>').val('');
    cbAtividade.find('option').remove().end().append('<option value="">Selecione</option>').val('');
    $.get(urls.GET_BUSCAR_PRODUTOS_ATIVIDADES, {'idLoja': components.cbLojas().val()}, function (data) {
        $.each(data, function (index, object) {
            $('<option>').val(object.idProduto).text(object.nomeProduto).appendTo(cbProduto);
        });

        $.each(data, function (index, object) {
            $('<option>').val(object.idProduto).text(object.atividade).appendTo(cbAtividade);
        });

    });


};

var gravarDados = function (rowIndex) {
    var data = new Date();
    var amostradorValue = components.cbAmostrador().find('option:selected').text();
    var lojaValue = components.cbLojas().find('option:selected').text();
    var unidadeVale = components.cbUnidades().find('option:selected').text();
//  var funcionarioValue = $('#tblColeta tr .func_nome ')[rowIndex].text;
    var produtoValue = $('#tblColeta tr .func_produto :selected')[rowIndex].text;
    var atividadeValue = $('#tblColeta tr .func_atividade :selected')[rowIndex].text;
    var dataColeta = (data.getMonth() + 1) + '/' + data.getDay() + '/' + data.getFullYear();
    var horaColeta = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();
    var horaReal = data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();

    var json = {
        'amostrador': amostradorValue,
        'loja': lojaValue,
        'unidade': unidadeVale,
        'data_coleta': dataColeta,
        'hora_coleta': horaColeta,
        'ts_sincronismo': horaReal,
        'produto': produtoValue,
        'atividade': atividadeValue
    };


    jQuery.ajax({
        url: urls.POST_GRAVAR_COLETA,
        type: "POST",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function () {
            console.log(arguments);
        }
    });

//    $.post(urls.POST_GRAVAR_COLETA, json, function () {
//        console.log(arguments);
//    }, 'json');
};

var combosPreenchidos = function () {

    var valorAmostrador = components.cbAmostrador().val();
    var valorLojas = components.cbLojas().val();
    var valorUnidades = components.cbUnidades().val();

    if (valorAmostrador === '' || valorLojas === '' || valorUnidades === '') {
        return false;
    }
    return true;

};

