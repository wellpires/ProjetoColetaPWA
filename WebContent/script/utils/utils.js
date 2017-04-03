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
//    var ORIGEM = "http://localhost:8080/ColetaWS/";
    var ORIGEM = "https://coletawsdev.mybluemix.net/";
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