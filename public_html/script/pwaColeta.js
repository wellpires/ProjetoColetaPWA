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
    //EM CASO DE ALTERAÇÃO, ALTERAR NO SERVICE WORKER
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
        navigator.serviceWorker.register('service-worker.js').then(function (registration) {
            console.log('Service Worker registered ', registration);
        }).catch(function (e) {
            console.log('ERRO ', e);
        });
    }

    var TEXTO_INICIAR = 'INICIAR';
    var TEXTO_PAUSAR = 'PAUSAR';

    startTime();

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

            popularComboFuncionarios(cbFuncionario, cbProduto, cbAtividade);

            var jqueryBtnAcao = '#' + idBtnAcao;
            $(jqueryBtnAcao).click(function (e) {
                $(jqueryBtnAcao).attr('value', 'REGISTRAR');
                var rowIndex = $('#tblColeta tr').index(e.target.parentNode.parentNode);
                var buttonComponent = $('#tblColeta tr td button');

                gravarDados(rowIndex - 1);


                if (buttonComponent[rowIndex] === undefined) {
                    buttonComponent[0].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                } else {
                    buttonComponent[rowIndex].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                }

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

            CountDown().Start(10000, $('#tblColeta tr td span'));
            $.each($('#tblColeta tr .func_nome'), function (index, object) {
                object.disabled = true;
            });


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
        popularComboLojas();

    });

    components.cbLojas().change(function () {
        components.btnNovaLinha().attr('disabled', !combosPreenchidos());
        components.cbUnidades().attr('disabled', !combosPreenchidos());
        components.cbUnidades().val('');
        if (event.target.value === '') {
            return;
        }
        components.cbUnidades().attr('disabled', false);
        popularComboUnidades();
    });

    components.cbUnidades().change(function () {
        components.btnNovaLinha().attr('disabled', !combosPreenchidos());
        if (event.target.value === '') {
            return;
        }

    });

    components.btnSincronizar().click(function () {

        $.when(apagarDados('amostradores')).then(function () {
            $.when(apagarDados('lojas')).then(function () {
                $.when(apagarDados('produtos')).then(function () {
                    $.when(apagarDados('unidades')).then(function () {
                        $.when(apagarDados('funcionarios')).then(function () {
                            $.when(carregarAmostrador(), carregarLojas(), carregarUnidades(), carregarFuncionarios(), carregarProdutosAtividades()).then(function (amostradores, lojas, unidades, funcionarios, produtos) {

                                var tblAmostrador = amostradores[0];
                                var nomeTblAmostrador = 'amostradores';
                                for (var i = 0; i < tblAmostrador.length; i++) {
                                    salvarDados(tblAmostrador[i], nomeTblAmostrador);
                                }

                                var tblLojas = lojas[0];
                                var nomeTblLojas = 'lojas';
                                for (var i = 0; i < tblLojas.length; i++) {
                                    salvarDados(tblLojas[i], nomeTblLojas);
                                }

                                var tblUnidades = unidades[0];
                                var nomeTblUnidades = 'unidades';
                                for (var i = 0; i < tblUnidades.length; i++) {
                                    salvarDados(tblUnidades[i], nomeTblUnidades);
                                }

                                var tblFuncionarios = funcionarios[0];
                                var nomeTblFuncionarios = 'funcionarios';
                                for (var i = 0; i < tblFuncionarios.length; i++) {
                                    salvarDados(tblFuncionarios[i], nomeTblFuncionarios);
                                }

                                var tblProdutos = produtos[0];
                                var nomeTblProdutos = 'produtos';
                                for (var i = 0; i < tblFuncionarios.length; i++) {
                                    salvarDados(tblProdutos[i], nomeTblProdutos);
                                }

                                popularComboAmostrador(tblAmostrador);

                            });

                        });
                    });
                });
            });
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

            for (var i = 0; i < GuiTimer.length; i++) {
                if (converterMinutosParaMilis(GuiTimer[i].innerHTML) < 62000) {
                    GuiTimer[i].parentNode.parentNode.style.backgroundColor = 'red';
                }
                if (converterMinutosParaMilis(GuiTimer[i].innerHTML) === 1000) {
                    if (i === 1) {
                        gravarDados();
                    }
                    GuiTimer[i].parentNode.parentNode.style.backgroundColor = 'white';

                }
            }

        }
        // Update Gui
        var Time = new Date();
        Time.setTime(EndTime - CurrentTime);
        var Minutes = Time.getMinutes();
        var Seconds = Time.getSeconds();

        for (var i = 0; i < GuiTimer.length; i++) {
            GuiTimer[i].innerHTML = (Minutes < 10 ? '0' : '') + Minutes + ':' + (Seconds < 10 ? '0' : '') + Seconds;
            if (converterMinutosParaMilis(GuiTimer[i].innerHTML) === 0) {
//                GuiTimer[i].innerHTML = '05:00';
                TimeOut = 300000;
//                Pause();
                Resume();
                UpdateTimer();
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
        GuiTimer = componentDisplay;
        TimeOut = Timeout;
        CurrentTime = (new Date()).getTime();
        EndTime = (new Date()).getTime() + TimeOut;
        UpdateTimer();
    };

    var keep = function (Timeout) {
        Running = true;
        TimeOut = Timeout;
        CurrentTime = (new Date()).getTime();
        EndTime = (new Date()).getTime() + TimeOut;
        UpdateTimer();
    };

    return {
        Pause: Pause,
        Resume: Resume,
        Start: Start
    };
};

var converterMinutosParaMilis = function (minutos) {

    var regex = /:/;

    if (regex.test(minutos)) {
        var minuto = parseInt(minutos.split(regex)[0]);
        var segundo = parseInt(minutos.split(regex)[1]);
        return (minuto * 60000) + (segundo * 1000);
    }

};

var popularComboAmostrador = function (amostradores) {
    $select = components.cbAmostrador();
    $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');
    $.each(amostradores, function (index, object) {
        $('<option>').val(object.idAmostrador).text(object.nomeAmostrador).appendTo($select);
    });
};

var popularComboLojas = function () {

    var codAmostrador = components.cbAmostrador().val();
    var query = buscarDadosLojas(codAmostrador);
    query.then(function (lojas) {
        $select = components.cbLojas();
        $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');
        $.each(lojas, function (index, object) {
            $('<option>').val(object.lojas.idLoja).text(object.lojas.nomeLoja).appendTo($select);
        });
    });

};

var popularComboUnidades = function () {

    var codAmostrador = components.cbAmostrador().val();
    var codLoja = components.cbLojas().val();
    var query = buscarDadosUnidades(codAmostrador, codLoja);

    query.then(function (unidades) {
        $select = components.cbUnidades();
        $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');
        $.each(unidades, function (index, object) {
            $('<option>').val(object.idUnidade).text(object.nomeUnidade).appendTo($select);
        });
    });
};

var popularComboFuncionarios = function (cbFuncionario, cbProduto, cbAtividade) {

    var idAmostrador = components.cbAmostrador().val();
    var idLoja = components.cbLojas().val();
    var idUnidade = components.cbUnidades().val();

    $.when(buscarDadosFuncionarios(idAmostrador, idLoja, idUnidade)).then(function (funcionarios) {
        $select = $(cbFuncionario);
        $select.find('option').remove().end().append('<option value="">Selecione</option>').val('');
        $.each(funcionarios[0], function (index, object) {
            $('<option>').val(object.idFuncionario).text(object.nomeFuncionario).appendTo($select);
        });
        popularComboProdutosAtividades(cbProduto, cbAtividade);
    });

};

var popularComboProdutosAtividades = function (cbProduto, cbAtividade) {

    var idLoja = components.cbLojas().val();

    var query = buscarDadosProdutosAtividades(idLoja);
    query.then(function (produtos) {
        cbProduto = $(cbProduto);
        cbAtividade = $(cbAtividade);

        cbProduto.find('option').remove().end().append('<option value="">Selecione</option>').val('');
        cbAtividade.find('option').remove().end().append('<option value="">Selecione</option>').val('');
        $.each(produtos, function (index, object) {
            $('<option>').val(object.idProduto).text(object.nomeProduto).appendTo(cbProduto);
        });

        $.each(produtos, function (index, object) {
            $('<option>').val(object.idProduto).text(object.atividade).appendTo(cbAtividade);
        });

    });

};

var carregarAmostrador = function () {
    return $.get(urls.GET_BUSCAR_AMOSTRADORES);
};

var carregarLojas = function () {
    return $.get(urls.GET_BUSCAR_LOJAS);
};

var carregarUnidades = function () {
    return $.get(urls.GET_BUSCAR_UNIDADES);
};

var carregarFuncionarios = function () {
    return $.get(urls.GET_BUSCAR_FUNCIONARIOS);
};

var carregarProdutosAtividades = function () {
    return $.get(urls.GET_BUSCAR_PRODUTOS_ATIVIDADES);
};


var gravarDados = function (rowIndex) {
    var amostradorValue = components.cbAmostrador().find('option:selected').text();
    var lojaValue = components.cbLojas().find('option:selected').text();
    var unidadeVale = components.cbUnidades().find('option:selected').text();
//  var funcionarioValue = $('#tblColeta tr .func_nome ')[rowIndex].text;
    var funcProduto = $('#tblColeta tr .func_produto :selected');
    var produtoValue = null;
    var arrayJson = [];

    //MARACUTAIA MONSTRA! CRIANÇAS, NÃO REPITAM ISSO EM CASA!
    var init = 0;
    var limit = funcProduto.length;
    if (rowIndex !== undefined) {
        init = rowIndex;
        limit = rowIndex + 1;
    }


    for (var i = init; i < limit; i++) {

        if ($(funcProduto)[i] === undefined) {
            produtoValue = $(funcProduto).text();
        } else {
            produtoValue = $(funcProduto)[i].text;
        }

        var funcAtividade = $('#tblColeta tr .func_atividade :selected');
        var atividadeValue = null;

        if ($(funcAtividade)[i] === undefined) {
            atividadeValue = $(funcAtividade).text();
        } else {
            atividadeValue = $(funcAtividade)[i].text;
        }

        var json = {
            'amostrador': amostradorValue,
            'loja': lojaValue,
            'unidade': unidadeVale,
            'dataColeta': new Date(),
            'horaColeta': new Date(),
            'horaReal': new Date(),
            'produto': produtoValue,
            'atividade': atividadeValue,
            'statusAmostra': ''
        };

        arrayJson.push(json);

    }

    salvarDados(arrayJson, 'coleta_amostra');

//    $.ajax({
//        url: urls.POST_GRAVAR_COLETA,
//        type: "POST",
//        data: JSON.stringify(json),
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        success: function () {
//            console.log(arguments);
//        }
//    });

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

