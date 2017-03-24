var ID_INTERVAL_REGISTRO = 0;
var ID_INTERVAL_TBL_LOG = 0;
var QTDE_REGISTRADA = 0;
var HORA_INICIAL = null;
var QTDE_LINHAS = 7;

//ADICIONAR TABELA DE LOG
$('<div style="width: 100%;overflow:scroll;height:800px;"><table id="tblLog" style="border: 1px solid black;border-collapse: collapse;width:100%"><tr style="border: 1px solid black;border-collapse: collapse;"><th style="border: 1px solid black;border-collapse: collapse;">Qtd Registrada</th><th style="border: 1px solid black;border-collapse: collapse;">Qtd retornada do BD</th><th style="border: 1px solid black;border-collapse: collapse;">Status</th></tr></table></div>').insertAfter('#tblColeta');

var CONFIG = (function(){

	components.btnNovaLinha().off('click');
	components.btnNovaLinha().click(function () {
		
		try{
		
		console.error('FUNÇÃO ALTERADAAAAAA');
        $.get("row_coleta.html", function (data) {

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
                console.info(" =================================== GRAVANDO DADOS ===================================== ");
                console.info(components.cbAmostrador().find('option:selected').text());
                console.info(components.cbLojas().find('option:selected').text());
                console.info(components.cbUnidades().find('option:selected').text());
                console.info($($('#tblColeta tr select.func_nome')[rowIndex-1]).find("option:selected").text());
                console.info($($('#tblColeta tr select.func_produto')[rowIndex-1]).find("option:selected").text());
                console.info($($('#tblColeta tr select.func_atividade')[rowIndex-1]).find("option:selected").text());
                console.info(" ======================================================================================== ");


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
                    
                    $.each($("#tblColeta tr td span"), function(index, object){
                        $(object).parents('tr').css('background-color','');
                        $(object).text('05:00');
                    });
                    
                    zerarContagemRegressiva();
                    startTime();
                    CountDown().Start(301000, $("#tblColeta tr td span"));
					INICIAR();
					
                }

                if (($("#tblColeta tr").length - 1) === 1) {
                    e.target.disabled = false;
                }
				QTDE_REGISTRADA++;
								  

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
        
		}catch(e){
			debugger;
		}
    });
	
	if($('#tblColeta tr button').length < 7){
		var count = 0;
		var interval = setInterval(function(){
			if(count === QTDE_LINHAS){
				clearInterval(interval);
			}
			components.btnNovaLinha().click();
			count++;
		}, 5000);
	}
	
	
	
})();

var INICIAR = (function(){
	
	var funcaoLog = function(){
		/* =================================== FUNÇÃO PARA LOG =================================== */
		var linhaHtml = '<tr style="border: 1px solid black;border-collapse: collapse;"><td  style="border: 1px solid black;border-collapse: collapse;"><div><p>${VALOR_1}</p></div></td><td style="border: 1px solid black;border-collapse: collapse;"><div><p>${VALOR_2}</p></div></td><td style="border: 1px solid black;border-collapse: collapse;"><div><p>${VALOR_3}</p></div></td></tr>';

		setTimeout(function() {
			bdConfigs.schemaBuilder().connect().then(function (db) {
				var tblAmostra = db.getSchema().table('coleta_amostra');
				var query = db.select(lf.fn.count(tblAmostra.idAmostra.as('QTDE'))).from(tblAmostra);
				query.exec().then(function(data){
					var status = data[0]['COUNT(idAmostra)'] === QTDE_REGISTRADA ? 'OK' :  'NOK';
					var qtde = data[0]['COUNT(idAmostra)'];
					linhaHtml = linhaHtml.replace('${VALOR_1}', QTDE_REGISTRADA); 
					linhaHtml = linhaHtml.replace('${VALOR_2}', qtde);
					linhaHtml = linhaHtml.replace('${VALOR_3}', status);
					$('#tblLog').append(linhaHtml);
					if(status === 'NOK'){
						alert('ERRO ENCONTRADO!');
					}
				});
			});
		}, 5000);

	}
	
	/* ====================================== FUNÇÕES ====================================== */
	var gerarValorAleatorio = function(max){
		return Math.floor(Math.random() * (max - 1) + 1);
	}
	/* ==================================================================================== */

	var preencherLinhas = function(){
		console.info("PREENCHENDO LINHAS");
		var linhas = $('#tblColeta tr button');
		
		//SELECIONAR OS FUNCIONARIOS
		console.info('SELECIONANDO OS FUNCIONARIOS');
		var contFuncionario = 0;
		var funcInterval = setInterval(function(){
			if(contFuncionario === QTDE_LINHAS){
				clearInterval(funcInterval);
				return;
			}
			var item = linhas[contFuncionario];
			var funcionario = $(item.parentNode.parentNode.children[0].children[0].children);
			var optionsFunc = funcionario.children();
			if(funcionario.prop('disabled')){
				return false;
			}
			funcionario.prop('value',optionsFunc[gerarValorAleatorio(optionsFunc.length)].value);
			contFuncionario++;
		}, 3000);

		
		//SELECIONANDO PRODUTOS E ATIVIDADES
		console.info('SELECIONANDO PRODUTOS - INICIO');
		var contProduto = 0;
		var prodInterval = setInterval(function(){
			if(contProduto === QTDE_LINHAS){
				clearInterval(prodInterval);
				return;
			}
			
			var item = linhas[contProduto];
			var produto = $(item.parentNode.parentNode.children[1].children[0].children);
			var optionsProd = produto.children();
			
			var atividade = $(item.parentNode.parentNode.children[2].children[0].children);
			var optionsAtiv = atividade.children();
	
			produto.prop('value', optionsProd[gerarValorAleatorio(optionsProd.length)].value);
			$.when(produto.change()).then(function(){
				setTimeout(function(){
					console.info('SELECIONANDO ATIVIDADES');
					atividade.prop('value', gerarValorAleatorio(optionsAtiv.length));
					atividade.prop('selectedIndex', 1);
				},2000)
			});
			contProduto++;
		}, 3000);

		console.info("PREENCHENDO LINHAS - FIM");
	};
	
	var clicarEmIniciar = function() {
		console.info("CLICANDO EM INICIAR - INICIO");
		var intervalIniciar = setInterval(function(){
			
			var selectFunc = $('#tblColeta tr select.func_nome');
			for(var i = 0 ; i < selectFunc.length ; i++){
				if(selectFunc[i].value === ''){
					return;
				}
			}

			if(components.btnIniciar().prop('value') === 'INICIAR'){
				var oldConfirm = window.confirm;
				window.confirm = function(e) {
					window.confirm = oldConfirm;
					return true;
				}
				components.btnIniciar().click();
			}
			clearInterval(intervalIniciar);
		});

		var funcaoIntervalo = function() {
			
			var regex = /:/;
			var data = new Date();
			
			if(HORA_INICIAL !== null){

				var TEMPO = converterMinutosParaMilis('10:00');
				var hora_final = components.txtHoraAtual().text().split(regex);
				var dataFinal = new Date(data.getFullYear(), (data.getMonth() + 1), data.getDate(), hora_final[0], hora_final[1], hora_final[2]);
				
				var diferenca = dataFinal.getTime() - HORA_INICIAL.getTime();
				if(diferenca >= TEMPO){
					HORA_INICIAL = null;
					funcaoLog();
					
				}
			}
			else{
				var horaInicial = components.txtHoraAtual().text().split(regex);
				HORA_INICIAL = new Date(data.getFullYear(), (data.getMonth() + 1), data.getDate(), horaInicial[0], horaInicial[1], horaInicial[2]);
			}
			
			
			var linhas = $('#tblColeta tr button');
			var numLinhas = linhas.length;
			
			for (var i = 0; i < numLinhas; i++) {
				if(components.btnIniciar().val() === 'INICIAR'){
					break;
				}				
				if (linhas[i].disabled === false) {
					if(linhas[i].parentNode.parentNode.children[1].children[0].children[0].value === '' || 
					   linhas[i].parentNode.parentNode.children[2].children[0].children[0].value === '' ){
							return;
						}
					linhas[i].click();
					break;
				}
			}
		};

		var clicarRegistrar = setInterval(funcaoIntervalo, 10000);//10segs
		ID_INTERVAL_REGISTRO = clicarRegistrar;
		console.info("CLICANDO EM INICIAR - FIM");
	};

	var iniciarColeta = function(preencherLinhas,clicarEmIniciar) {
		clearInterval(ID_INTERVAL_REGISTRO);
		$.when(preencherLinhas()).then(clicarEmIniciar());
	}
	
	iniciarColeta(preencherLinhas, clicarEmIniciar);
	
});
