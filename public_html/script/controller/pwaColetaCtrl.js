app.controller('pwaColetaCtrl', function ($scope) {
    $scope.lstAmostradores = [];
    $scope.lstLojas = [];
    $scope.lstUnidades = [];
    $scope.lstFuncionarios = [];
    $scope.lstProdutos = [];
    $scope.lstAtividades = [];

    $scope.amostrador = null;
    $scope.loja = null;
    $scope.unidade = null;

    var carregarAmostrador = function () {
        for (var i = 0; i < 100; i++) {
            var amostrador = function (idAmostrador) {
                var id_amostrador = idAmostrador;
                var amostrador_desc = 'Amostrador ' + idAmostrador;
                return{
                    id_amostrador: id_amostrador,
                    amostrador_desc: amostrador_desc
                };
            };
            $scope.lstAmostradores.push(amostrador(i));
        }
    };

    var carregarLojas = function () {
        for (var i = 0; i < 100; i++) {
            var loja = function (idLoja) {
                var idLoja = idLoja;
                var loja_desc = 'Loja ' + idLoja;
                return{
                    idLoja: idLoja,
                    loja_desc: loja_desc
                };
            };
            $scope.lstLojas.push(loja(i));
        }
    };

    var carregarUnidades = function () {
        for (var i = 0; i < 100; i++) {
            var unidade = function (idUnidade) {
                var id_unidade = idUnidade;
                var unidade_desc = 'Unidade ' + idUnidade;
                return{
                    id_unidade: id_unidade,
                    unidade_desc: unidade_desc
                };
            };
            $scope.lstUnidades.push(unidade(i));
        }
    };

    var carregarFuncionarios = function () {
        for (var i = 0; i < 100; i++) {
            var funcionario = function (idFuncionario) {
                var id_funcionario = idFuncionario;
                var funcionario_desc = 'Funcionário ' + idFuncionario;
                return{
                    id_funcionario: id_funcionario,
                    funcionario_desc: funcionario_desc
                };
            };
            $scope.lstFuncionarios.push(funcionario(i));
        }
        console.log($scope.lstFuncionarios);
    };

    $scope.adcLinha = function () {

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
            carregarFuncionarios();

        });
    };

    $scope.iniciarColeta = function () {
        var TEXTO_INICIAR = 'INICIAR';
        var TEXTO_PAUSAR = 'PAUSAR';
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

    };


    $scope.buscarLojas = function (item) {
        carregarLojas();
    };

    $scope.buscarUnidades = function (item) {
        carregarUnidades();
    };

    carregarAmostrador();

});

