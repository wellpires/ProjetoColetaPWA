package br.com.everis.coletaws;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.amostrador.services.IAmostradorService;
import br.com.everis.coletaws.amostrador.services.impl.AmostradorServiceImpl;
import br.com.everis.coletaws.coletaAmostra.model.ColetaAmostra;
import br.com.everis.coletaws.coletaAmostra.service.IColetaAmostraService;
import br.com.everis.coletaws.coletaAmostra.service.impl.ColetaAmostraServiceImpl;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import br.com.everis.coletaws.funcionario.services.IFuncionarioService;
import br.com.everis.coletaws.funcionario.services.impl.FuncionarioServiceImpl;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.loja.service.ILojaService;
import br.com.everis.coletaws.loja.service.impl.LojaServiceImpl;
import br.com.everis.coletaws.produto.model.Produto;
import br.com.everis.coletaws.produto.service.IProdutoService;
import br.com.everis.coletaws.produto.service.impl.ProdutoServiceImpl;
import br.com.everis.coletaws.unidade.model.Unidade;
import br.com.everis.coletaws.unidade.service.IUnidadeService;
import br.com.everis.coletaws.unidade.service.impl.UnidadeServiceImpl;
import br.com.everis.coletaws.utils.JPAUtil;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Path("/")
public class ColetaWS {

    private IAmostradorService amostradorService;
    private ILojaService lojaService = null;
    private IUnidadeService unidadeService = null;
    private IFuncionarioService funcionarioService = null;
    private IProdutoService produtoService = null;
    private IColetaAmostraService coletaAmostraService = null;

    @GET
    @Path("/buscarAmostrador")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarAmostrador() {
        try {
            amostradorService = new AmostradorServiceImpl();
            List<Amostrador> lstAmostradores = amostradorService.buscarAmostradores();
            return Response.ok(new Gson().toJson(lstAmostradores)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/buscarLojas")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarLojas() {
        try {
            lojaService = new LojaServiceImpl();
            List<Loja> lstLoja = lojaService.buscarLojas();
            return Response.ok(new Gson().toJson(lstLoja)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    
    
    @GET
    @Path("/buscarUnidades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarUnidades() {
        try {
            unidadeService = new UnidadeServiceImpl();
            List<Unidade> lstUnidades = unidadeService.buscarUnidades();
            return Response.ok(new Gson().toJson(lstUnidades)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }

    }

    @GET
    @Path("/buscarFuncionarios")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarFuncionarios() {

        try {
            funcionarioService = new FuncionarioServiceImpl();
            List<Funcionario> lstUnidade = funcionarioService.buscarFuncionarios();
            return Response.ok(new Gson().toJson(lstUnidade)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }

    }

    @GET
    @Path("/buscarProdutosAtividades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarProdutos() {
        try {
            produtoService = new ProdutoServiceImpl();
            List<Produto> lstProdutos = produtoService.buscarProdutos();

            return Response.ok(new Gson().toJson(lstProdutos)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @POST
    @Path("/gravarColeta")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response gravarColeta(String coleta) {
        try {
            JSONObject json = (JSONObject) new JSONParser().parse(coleta);
            SimpleDateFormat sdf = new SimpleDateFormat("d/M/yyyy");
            SimpleDateFormat sdfHora = new SimpleDateFormat("HH:mm:ss");

            ColetaAmostra coletaAmostra = new ColetaAmostra();
            coletaAmostra.setAmostrador(json.get("amostrador").toString());
            coletaAmostra.setLoja(json.get("loja").toString());
            coletaAmostra.setUnidade(json.get("unidade").toString());
            coletaAmostra.setDataColeta(sdf.parse(json.get("data_coleta").toString()));
            coletaAmostra.setHoraColeta(sdfHora.parse(json.get("hora_coleta").toString()));
            coletaAmostra.setHoraReal(sdfHora.parse(json.get("ts_sincronismo").toString()));
            coletaAmostra.setProduto(json.get("produto").toString());
            coletaAmostra.setAtividade(json.get("atividade").toString());
            coletaAmostra.setStatusAmostra("EU NAO SEI O QUE COLOCAR AQUI");

            coletaAmostraService = new ColetaAmostraServiceImpl();
            coletaAmostraService.gravarColeta(coletaAmostra);
            return Response.ok().build();
        } catch (JsonSyntaxException e) {
            return Response.serverError().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    public IAmostradorService getAmostradorService() {
        return amostradorService;
    }

    public void setAmostradorService(IAmostradorService amostradorService) {
        this.amostradorService = amostradorService;
    }

}
