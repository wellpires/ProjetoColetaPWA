var components = function () {

    var func_info = function () {
        return $("#func_info");
    };

    var btnNovaLinha = function () {
        return $("#btnNovaLinha");
    };

    var txtHoraAtual = function () {
        return $("#txtHoraAtual");
    };

    var idCheckbox = function () {
        return $(".checkboxesClass");
    };

    var tblColeta = function () {
        return $("#tblColeta");
    };

    var btnIniciar = function () {
        return $("#btnIniciar");
    };

    var btnPausar = function () {
        return $("#btnPausar");
    };

    var btnParar = function () {
        return $("#btnParar");
    };

    var cbAmostrador = function () {
        return $("#select_amostrador");
    };

    var cbLojas = function () {
        return $("#select_loja");
    };

    var cbUnidades = function () {
        return $("#select_unidade");
    };

    var btnSincronizar = function () {
        return $("#btnSincronizar");
    };

    var spanStatus = function () {
        return $("#status");
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
        btnSincronizar: btnSincronizar,
        spanStatus: spanStatus
    };

}();

var urls = function () {
    //EM CASO DE ALTERAÇÃO, ALTERAR NO SERVICE WORKER
   var ORIGEM = "http://localhost:8080/ColetaWS/";
//    var ORIGEM = "https://coletawsdev.mybluemix.net/";
    // var ORIGEM = "https://coletaws.mybluemix.net/";
    var GET_BUSCAR_AMOSTRADORES = ORIGEM + "buscarAmostradores";
    var GET_BUSCAR_LOJAS = ORIGEM + "buscarLojas";
    var GET_BUSCAR_UNIDADES = ORIGEM + "buscarUnidades";
    var GET_BUSCAR_FUNCIONARIOS = ORIGEM + "buscarFuncionarios";
    var GET_BUSCAR_PRODUTOS = ORIGEM + "buscarProdutos";
    var GET_BUSCAR_ATIVIDADES = ORIGEM + "buscarAtividades";
    var GET_BUSCAR_LOJAS_PRODUTOS_ATIVIDADES = ORIGEM + "buscarLojasProdutosAtividades";
    var GET_BUSCAR_AMOSTRADORES_LOJAS_UNIDADES = ORIGEM + "buscarAmostradoresLojasUnidades";
    var POST_GRAVAR_COLETA = ORIGEM + "gravarColeta";

    return{
        GET_BUSCAR_AMOSTRADORES: GET_BUSCAR_AMOSTRADORES,
        GET_BUSCAR_LOJAS: GET_BUSCAR_LOJAS,
        GET_BUSCAR_UNIDADES: GET_BUSCAR_UNIDADES,
        GET_BUSCAR_FUNCIONARIOS: GET_BUSCAR_FUNCIONARIOS,
        GET_BUSCAR_PRODUTOS: GET_BUSCAR_PRODUTOS,
        GET_BUSCAR_ATIVIDADES: GET_BUSCAR_ATIVIDADES,
        GET_BUSCAR_LOJAS_PRODUTOS_ATIVIDADES: GET_BUSCAR_LOJAS_PRODUTOS_ATIVIDADES,
        GET_BUSCAR_AMOSTRADORES_LOJAS_UNIDADES: GET_BUSCAR_AMOSTRADORES_LOJAS_UNIDADES,
        POST_GRAVAR_COLETA: POST_GRAVAR_COLETA
    };
}();

//==============================================================================

(function ($, window, document) {

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js").then(function (registration) {
            console.log("Service Worker registered ", registration);
        }).catch(function (e) {
            console.log("ERRO ", e);
        });
    }

    var TEXTO_INICIAR = "INICIAR";
    var TEXTO_PAUSAR = "PAUSAR";

    startTime();

    components.btnNovaLinha().click(function () {
        $.get("row_coleta.html").then(function (data) {

            var rowCount = $("#tblColeta tr").length;

            if (rowCount === 1) {
                components.btnIniciar().attr("disabled", false);
            }

            if (rowCount === 8) {
                components.btnNovaLinha().attr("disabled", true);
                return;
            }

            $("#tblColeta > tbody:last-child").append(data);
            var randomId = parseInt(Math.random() * 1000);
            var divId = "idDiv" + randomId;
            var idBtnAcao = "btnAcao" + randomId;
            var tempoId = "spanTempo" + randomId;
            var deletarId = "btnDeletar" + randomId;
            
            
            $("#id_div_inicial").attr("id", divId);
            $("#id_btn_inicial").attr("id", idBtnAcao);
            $("#id_btn_apagar").attr("id", deletarId);
            $("#spanTempo").attr("id", tempoId);
            var tamanhoFunci = $("#tblColeta tr td select").length;
            var cbFuncionario = $("#tblColeta tr td select")[tamanhoFunci - 3];
            var cbProduto = $("#tblColeta tr td select")[tamanhoFunci - 2];
            var cbAtividade = $("#tblColeta tr td select")[tamanhoFunci - 1];
            
            popularComboFuncionarios(cbFuncionario, cbProduto);

            var jqueryBtnAcao = "#" + idBtnAcao;
            $(jqueryBtnAcao).click(function (e) {
                $(jqueryBtnAcao).attr("value", "REGISTRAR");
                var rowIndex = $("#tblColeta tr").index(e.target.parentNode.parentNode);
                var buttonComponent = $("#tblColeta tr td button");

                var msg = "";
                if ($($("#tblColeta tr td select.func_produto :selected")[rowIndex - 1]).val() === "") {
                    msg += "Favor selecionar um produto";
                }
                if ($($("#tblColeta tr td select.func_atividade :selected")[rowIndex - 1]).val() === "") {
                    msg += "\nFavor selecionar uma atividade";

                }

                if (msg.trim().length > 0) {
                    alert(msg);
                    return;
                }

                gravarDados(rowIndex - 1);


                if (buttonComponent[rowIndex] === undefined) {
                    buttonComponent[0].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                } else {
                    buttonComponent[rowIndex].disabled = false;
                    buttonComponent[rowIndex - 1].disabled = true;
                }

                $("#tblColeta td select.func_produto")[rowIndex - 1].value = "";
                $("#tblColeta td select.func_atividade")[rowIndex - 1].value = "";

                if (rowIndex === $("#tblColeta tr").length - 1) {

                    $.each($("#tblColeta tr td span"), function (index, object) {
                        $(object).parents('tr').css('background-color', '');
                    });

                    zerarContagemRegressiva();
                    startTime();
                    CountDown().Start(300000, $("#tblColeta tr td span"));
                }

                if (($("#tblColeta tr").length - 1) === 1) {
                    e.target.disabled = false;
                }

            });


            var jqueryBtnDeletar = "#" + deletarId;
            $(jqueryBtnDeletar).click(function () {
                if (!confirm("Tem certeza?")) {
                    return;
                }

                $(this).parents("tr").remove();

                var rowCount = $("#tblColeta tr").length;
                if (rowCount === 1) {
                    components.btnIniciar().attr("disabled", true);
                    components.btnParar().attr("disabled", true);
                    components.btnIniciar().val(TEXTO_INICIAR);
                    components.btnNovaLinha().attr("disabled", false);
                    zerarContagemRegressiva();
                }
                if (rowCount === 7) {
                    components.btnNovaLinha().attr("disabled", false);
                }
            });

            $(cbProduto).change(function (e) {
                popularComboAtividades(cbAtividade, e.target.value);
            });

        });
    });

    components.btnIniciar().click(function () {
        if (!confirm("Tem certeza?")) {
            return;
        }

        if (components.btnIniciar().val() === TEXTO_INICIAR) {

            var funcionarios = $("#tblColeta tr td select.func_nome");
            var cont = 0;
            for (var i = 0; i < funcionarios.length; i++) {
                if (funcionarios[i].value === "") {
                    cont++;
                }
            }

            if (cont > 0) {
                alert("Favor selecione os funcionários");
                return;
            }

            components.btnIniciar().attr("value", TEXTO_PAUSAR);
            components.btnParar().attr("disabled", false);
            components.cbAmostrador().attr("disabled", true);
            components.cbLojas().attr("disabled", true);
            components.cbUnidades().attr("disabled", true);
            components.btnNovaLinha().attr("disabled", true);
            components.btnSincronizar().attr("disabled", true);

            $("#tblColeta tr td button")[0].disabled = false;

//            5 segundos para teste
//            CountDown().Start(5000, $("#tblColeta tr td span"));
            CountDown().Start(300000, $("#tblColeta tr td span"));
            $.each($("#tblColeta tr .func_nome"), function (index, object) {
                object.disabled = true;
            });
            $.each($("#tblColeta tr td input"), function (index, object) {
                object.disabled = true;
            });


        } else if (components.btnIniciar().val() === TEXTO_PAUSAR) {
            pausarParar(TEXTO_INICIAR);
            components.btnParar().attr("disabled", false);
            components.btnNovaLinha().attr("disabled", false);
            $.each($("#tblColeta tr td input"), function (index, object) {
                object.disabled = false;
            });
        }
    });

    components.btnParar().click(function () {
        if (!confirm("Tem certeza?")) {
            return;
        }

        pausarParar(TEXTO_INICIAR);
        resetCb();
        components.btnIniciar().attr("disabled", true);
    });

    components.cbAmostrador().change(function (event) {
        components.btnNovaLinha().attr("disabled", !combosPreenchidos());
        components.cbLojas().attr("disabled", !combosPreenchidos());
        components.cbUnidades().attr("disabled", !combosPreenchidos());
        components.cbLojas().val("");
        components.cbUnidades().val("");
        apagarTabela();
        if (event.target.value === "") {
            return;
        }
        popularComboLojas();

    });

    components.cbLojas().change(function () {
        components.btnNovaLinha().attr("disabled", !combosPreenchidos());
        components.cbUnidades().attr("disabled", !combosPreenchidos());
        components.cbUnidades().val("");
        apagarTabela();
        if (event.target.value === "") {
            return;
        }
        components.cbUnidades().attr("disabled", false);
        popularComboUnidades();
    });

    components.cbUnidades().change(function () {
        components.btnNovaLinha().attr("disabled", !combosPreenchidos());
        apagarTabela();
        if (event.target.value === "") {
            return;
        }
    });

    components.btnSincronizar().click(function () {
        if (!confirm("Tem certeza?")) {
            return;
        }
        if (!navigator.onLine) {
            alert("Você está offline. Nenhum dado será carregado ou gravado no servidor.");
            showInfoModal("CARREGANDO DADOS DO BANCO LOCAL");
            buscarDadosAmostrador().then(function (rows) {
                if (rows.length === 0) {
                    closeModal();
                    return;
                }
                popularComboAmostrador(rows);
            }).catch(function () {
                showErrorModal("Erro ao conectar no banco de dados local.");
            });
            return;
        }
        showInfoModal("CARREGANDO DADOS DO SERVIDOR...");
        carregarAmostrador().done(function (amostradores) {
            carregarLojas().done(function (lojas) {
                carregarUnidades().done(function (unidades) {
                    carregarFuncionarios().done(function (funcionarios) {
                        carregarProdutos().done(function (produtos) {
                            carregarAtividades().done(function (atividades) {
                                carregarLojasProdutosAtividades().done(function (lojasProdutosAtividades) {
                                    carregarAmostradoresLojasUnidades().done(function (amostradoresLojasUnidades) {
                                        showInfoModal("FINALIZANDO...");
                                        buscarDadosColetaAmostra().then(function (data) {
                                            gravarColeta(data).always(function (response) {
                                                try {
                                                    if (response.status === 200) {
                                                        apagarDados('coleta_amostra');
                                                    }

                                                    var tblAmostrador = amostradores;
                                                    var nomeTblAmostrador = "amostradores";
                                                    apagarDados(nomeTblAmostrador);
                                                    salvarDados(tblAmostrador, nomeTblAmostrador);

                                                    var tblLojas = lojas;
                                                    var nomeTblLojas = "lojas";
                                                    apagarDados(nomeTblLojas);
                                                    salvarDados(tblLojas, nomeTblLojas);

                                                    var tblUnidades = unidades;
                                                    var nomeTblUnidades = "unidades";
                                                    apagarDados(nomeTblUnidades);
                                                    salvarDados(tblUnidades, nomeTblUnidades);

                                                    var tblFuncionarios = funcionarios;
                                                    var nomeTblFuncionarios = "funcionarios";
                                                    apagarDados(nomeTblFuncionarios);
                                                    salvarDados(tblFuncionarios, nomeTblFuncionarios);

                                                    var tblProdutos = produtos;
                                                    var nomeTblProdutos = "produtos";
                                                    apagarDados(nomeTblProdutos);
                                                    salvarDados(tblProdutos, nomeTblProdutos);

                                                    var tblAtividade = atividades;
                                                    var nomeTblAtividades = "atividades";
                                                    apagarDados(nomeTblAtividades);
                                                    salvarDados(tblAtividade, nomeTblAtividades);

                                                    var tblLojasProdutoAtividades = lojasProdutosAtividades;
                                                    var nomeLojasProdutoAtividades = "lojas_produtos_atividades";
                                                    apagarDados(nomeLojasProdutoAtividades);
                                                    salvarDados(tblLojasProdutoAtividades, nomeLojasProdutoAtividades);

                                                    var tblAmostradoresLojasUnidades = amostradoresLojasUnidades;
                                                    var nomeAmostradoresLojasUnidades = "amostradores_lojas_unidades";
                                                    apagarDados(nomeAmostradoresLojasUnidades);
                                                    salvarDados(tblAmostradoresLojasUnidades, nomeAmostradoresLojasUnidades);

                                                    if (!$("#tblCabecalho tr td #select_amostrador")[0].disabled) {
                                                        popularComboAmostrador(tblAmostrador);
                                                        closeModal();
                                                    }
                                                } catch (e) {
                                                    showErrorModal(e);
                                                }
                                            });
                                        }).catch(function (e) {
                                            showErrorModal("ERRO AO CARREGAR DADOS DO BANCO LOCAL.\n" + e);
                                        });
                                    });
                                }).fail(function (e) {
                                    showErrorModal("ERRO AO CARREGAR DADOS DO SERVIDOR.\n" + e);
                                });
                            }).fail(function (e) {
                                showErrorModal("ERRO AO CARREGAR ATIVIDADES DO SERVIDOR.\n" + e);
                            });
                        }).fail(function (e) {
                            showErrorModal("ERRO AO CARREGAR PRODUTOS DO SERVIDOR.\n" + e);
                        });
                    }).fail(function (e) {
                        showErrorModal("ERRO AO CARREGAR FUNCIONÁRIOS DO SERVIDOR.\n" + e);
                    });
                }).fail(function (e) {
                    showErrorModal("ERRO AO CARREGAR UNIDADES DO SERVIDOR.\n" + e);
                });
            }).fail(function (e) {
                showErrorModal("ERRO AO CARREGAR LOJAS DO SERVIDOR.\n" + e);
            });
        }).fail(function (e) {
            showErrorModal("ERRO AO CARREGAR AMOSTRADOR DO SERVIDOR.\n" + e);
        });
    });
})(window.jQuery, window, document);

window.onload = function () {};

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
    $select.find("option").remove().end().append("<option value=\"\">Selecione</option>").val("");
    $.each(amostradores, function (index, object) {
        $("<option>").val(object.idAmostrador).text(object.nomeAmostrador).appendTo($select);
    });
};

var popularComboLojas = function () {

    var codAmostrador = components.cbAmostrador().val();
    var query = buscarDadosLojas(codAmostrador);
    query.then(function (lojas) {
        lojas = retirarObjetosRepetidos(lojas);
        components.cbLojas().attr("disabled", false);
        $select = components.cbLojas();
        $select.find("option").remove().end().append("<option value=\"\">Selecione</option>").val("");
        $.each(lojas, function (index, object) {
            $("<option>").val(object.lojas.idLoja).text(object.lojas.nomeLoja).appendTo($select);
        });
    });

};

var popularComboUnidades = function () {

    var codAmostrador = components.cbAmostrador().val();
    var codLoja = components.cbLojas().val();
    var query = buscarDadosUnidades(codAmostrador, codLoja);

    query.then(function (unidades) {
        components.cbUnidades().attr("disabled", false);
        $select = components.cbUnidades();
        $select.find("option").remove().end().append("<option value=\"\">Selecione</option>").val("");
        $.each(unidades, function (index, object) {
            $("<option>").val(object.unidades.idUnidade).text(object.unidades.nomeUnidade).appendTo($select);
        });
    });
};

var popularComboFuncionarios = function (cbFuncionario, cbProduto) {

    var idUnidade = components.cbUnidades().val();

    buscarDadosFuncionarios(idUnidade).then(function (funcionarios) {
        $select = $(cbFuncionario);
        $select.find("option").remove().end().append("<option value=\"\">Selecione</option>").val("");
        $.each(funcionarios, function (index, object) {
            $("<option>").val(object.idFuncionario).text(object.nomeFuncionario).appendTo($select);
        });
        popularComboProdutos(cbProduto);
    });

};

var popularComboProdutos = function (cbProduto) {

    var idLoja = components.cbLojas().val();

    $.when(buscarDadosProdutos(idLoja)).then(function (produtos) {
        cbProduto = $(cbProduto);
        cbProduto.find("option").remove().end().append("<option value=\"\">Selecione</option>").val("");
        $.each(produtos, function (index, object) {
            $("<option>").val(object.produtos.idProduto).text(object.produtos.nomeProduto).appendTo(cbProduto);
        });
    });
};

var popularComboAtividades = function (cbAtividades, idProduto) {

    var idLoja = components.cbLojas().val();
    $.when(buscarDadosAtividades(idLoja, idProduto)).then(function (atividades) {
        cbAtividades = $(cbAtividades);
        cbAtividades.attr("disabled", false);
        cbAtividades.find("option").remove().end().append("<option value=\"\">Selecione</option>").val("");
        $.each(atividades, function (index, object) {
            $("<option>").val(object.atividades.idAtividade).text(object.atividades.nomeAtividade).appendTo(cbAtividades);
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

var carregarProdutos = function () {
    return $.get(urls.GET_BUSCAR_PRODUTOS);
};

var carregarAtividades = function () {
    return $.get(urls.GET_BUSCAR_ATIVIDADES);
};

var carregarLojasProdutosAtividades = function () {
    return $.get(urls.GET_BUSCAR_LOJAS_PRODUTOS_ATIVIDADES);
};

var carregarAmostradoresLojasUnidades = function () {
    return $.get(urls.GET_BUSCAR_AMOSTRADORES_LOJAS_UNIDADES);
};

var gravarColeta = function (data) {
    var json = JSON.stringify(data);
    return $.ajax({
        url: urls.POST_GRAVAR_COLETA,
        type: "post",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });

};

var gravarDados = function (rowIndex, limiteItens) {
    var amostradorValue = components.cbAmostrador().find("option:selected").text();
    var lojaValue = components.cbLojas().find("option:selected").text();
    var unidadeVale = components.cbUnidades().find("option:selected").text();
    var funcProduto = $("#tblColeta tr .func_produto :selected");
    var produtoValue = null;
    var arrayJson = [];

    //MARACUTAIA MONSTRA! CRIANÇAS, NÃO REPITAM ISSO EM CASA!
    var init = 0;
    var limit = funcProduto.length;
    if (rowIndex !== undefined) {
        init = rowIndex;
        limit = rowIndex + 1;
    }
    if (limiteItens !== undefined) {
        limit = limiteItens;
    }


    for (var i = init; i < limit; i++) {

        if ($(funcProduto)[i] === undefined) {
            produtoValue = $(funcProduto).text();
        } else {
            produtoValue = $(funcProduto)[i].text;
        }

        var funcAtividade = $("#tblColeta tr .func_atividade :selected");
        var atividadeValue = null;

        if ($(funcAtividade)[i] === undefined) {
        	if($("#tblColeta tr .func_atividade")[i].disabled){
        		atividadeValue = 'Selecione';
        	}else{
                atividadeValue = $(funcAtividade).text();
        	}
        } else {
            atividadeValue = $(funcAtividade)[i].text;
        }

        var func = $("#tblColeta tr .func_nome :selected");
        var funcValue = null;

        if ($(func)[i] === undefined) {
            funcValue = $(func).text();
        } else {
            funcValue = $(func)[i].text;
        }


        var data = new Date();
        var dataUTC = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds()));
        
        var json = {
            "amostrador": amostradorValue,
            "loja": lojaValue,
            "unidade": unidadeVale,
            "dataColeta": dataUTC,
            "horaColeta": dataUTC,
            "horaReal": dataUTC,
            "produto": produtoValue,
            "atividade": atividadeValue,
            "statusAmostra": "",
            "funcionario": funcValue
        };
        arrayJson.push(json);

    }

    salvarDados(arrayJson, "coleta_amostra");

};

var combosPreenchidos = function () {

    var valorAmostrador = components.cbAmostrador().val();
    var valorLojas = components.cbLojas().val();
    var valorUnidades = components.cbUnidades().val();

    if (valorAmostrador === "" || valorLojas === "" || valorUnidades === "") {
        return false;
    }
    return true;

};

var pausarParar = function (TEXTO_INICIAR) {
    components.btnIniciar().attr("value", TEXTO_INICIAR);
    $("#tblColeta tr td button").attr("disabled", true);
    components.btnParar().attr("disabled", true);
    components.btnSincronizar().attr("disabled", false);
    zerarContagemRegressiva();
    startTime();
    $("#tblColeta tr td span").each(function (index, comp) {
        comp.innerHTML = "05:00";
        $(comp).parent().parent().css("background-color", "");
        $("#tblColeta tr td select.func_produto")[index].value = "";
        $("#tblColeta tr td select.func_atividade")[index].value = "";
    });
};

var resetCb = function () {
    components.cbAmostrador().attr("disabled", false);
    components.cbLojas().attr("disabled", true);
    components.cbUnidades().attr("disabled", true);
    components.cbAmostrador().val("");
    components.cbUnidades().val("");
    components.cbLojas().val("");
    apagarTabela();
};

var apagarTabela = function () {
    $.each($("#tblColeta select").parent().parent().parent(), function (index, object) {
        object.remove();
    });
};

var retirarObjetosRepetidos = function (array) {
    var results = [];
    var idsSeen = {};
    var idSeenValue = {};
    for (var i = 0, len = array.length, id; i < len; ++i) {
        id = array[i].lojas.idLoja;
        if (idsSeen[id] !== idSeenValue) {
            results.push(array[i]);
            idsSeen[id] = idSeenValue;
        }
    }
    return results;
};

var openModal = function () {
    $("#modal").css("display", "block");
    $("#fade").css("display", "block");
};

var closeModal = function () {
    $("#modal").css("display", "none");
    $("#fade").css("display", "none");
};


var infoModal = function () {
    $("#modal").css({"border": "3px solid #ababab",
        "box-shadow": "1px 1px 10px #ababab"});
};

var errorModal = function () {
    var $div2 = $("#modal");
    if ($div2.data("active")) {
        return;
    }
    $div2.css({"border": "3px solid #f73b3b",
        "box-shadow": "1px 1px 10px #f73b3b"});
    setTimeout(function () {
        closeModal();
    }, 5000);
};

var showInfoModal = function (msg) {
    showModal(msg, 1);
};

var showErrorModal = function (msg) {
    showModal(msg, 0);
};

var showModal = function (msg, type) {
    openModal();
    components.spanStatus().text(msg);
    if (type === 0) {
        errorModal();
    } else {
        infoModal();
    }
};
