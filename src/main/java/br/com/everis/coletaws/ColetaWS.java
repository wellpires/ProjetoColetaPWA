package br.com.everis.coletaws;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.amostrador.services.IAmostradorService;
import br.com.everis.coletaws.amostrador.services.impl.AmostradorServiceImpl;
import br.com.everis.coletaws.amostradoreslojasunidades.model.AmostradoresLojasUnidades;
import br.com.everis.coletaws.amostradoreslojasunidades.service.IAmostradoresLojasUnidadesService;
import br.com.everis.coletaws.amostradoreslojasunidades.service.impl.AmostradoresLojasUnidadesServiceImpl;
import br.com.everis.coletaws.atividade.model.Atividade;
import br.com.everis.coletaws.atividade.service.IAtividadeService;
import br.com.everis.coletaws.atividade.service.impl.AtividadeServiceImpl;
import br.com.everis.coletaws.coletaAmostra.model.ColetaAmostra;
import br.com.everis.coletaws.coletaAmostra.service.IColetaAmostraService;
import br.com.everis.coletaws.coletaAmostra.service.impl.ColetaAmostraServiceImpl;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import br.com.everis.coletaws.funcionario.services.IFuncionarioService;
import br.com.everis.coletaws.funcionario.services.impl.FuncionarioServiceImpl;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.loja.service.ILojaService;
import br.com.everis.coletaws.loja.service.impl.LojaServiceImpl;
import br.com.everis.coletaws.lojaprodutoatividade.model.LojaProdutosAtividade;
import br.com.everis.coletaws.lojaprodutoatividade.service.ILojaProdutoAtividadePKService;
import br.com.everis.coletaws.lojaprodutoatividade.service.impl.LojaProdutoAtividadePKServiceImpl;
import br.com.everis.coletaws.produto.model.Produto;
import br.com.everis.coletaws.produto.service.IProdutoService;
import br.com.everis.coletaws.produto.service.impl.ProdutoServiceImpl;
import br.com.everis.coletaws.unidade.model.Unidade;
import br.com.everis.coletaws.unidade.service.IUnidadeService;
import br.com.everis.coletaws.unidade.service.impl.UnidadeServiceImpl;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.simple.JSONArray;
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
    private IAtividadeService atividadeService = null;
    private ILojaProdutoAtividadePKService lojaProdutoAtividadePKService = null;
    private IAmostradoresLojasUnidadesService amostradoresLojasUnidadesService = null;

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
    @Path("/buscarProdutos")
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

    @GET
    @Path("/buscarAtividades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarAtividades() {
        try {
            atividadeService = new AtividadeServiceImpl();
            List<Atividade> lstAtividades = atividadeService.buscarAtividades();
            return Response.ok(new Gson().toJson(lstAtividades)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/buscarLojasProdutosAtividades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarLojasProdutosAtividades() {
        try {
            lojaProdutoAtividadePKService = new LojaProdutoAtividadePKServiceImpl();
            List<LojaProdutosAtividade> lstLojaProdutoAtividades = lojaProdutoAtividadePKService.buscarLojaProdutoAtividade();

            JSONArray jsonArray = new JSONArray();
            for (LojaProdutosAtividade lpa : lstLojaProdutoAtividades) {
                JSONObject item = new JSONObject();
                item.put("idLoja", lpa.getLojaProdutoAtividadePK().getLoja().getIdLoja());
                item.put("idProduto", lpa.getLojaProdutoAtividadePK().getProduto().getIdProduto());
                item.put("idAtividade", lpa.getLojaProdutoAtividadePK().getAtividade().getIdAtividade());
                jsonArray.add(item);
            }

            return Response.ok(new Gson().toJson(jsonArray)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity(e.getMessage()).type(MediaType.TEXT_PLAIN).build();
        }
    }

    @GET
    @Path("/buscarAmostradoresLojasUnidades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarAmostradoresLojasUnidades() {
        try {

            amostradoresLojasUnidadesService = new AmostradoresLojasUnidadesServiceImpl();
            List<AmostradoresLojasUnidades> lstAmostradoresLojasUnidades = amostradoresLojasUnidadesService.buscarAmostradoresLojasUnidades();

            JSONArray jsonArray = new JSONArray();
            for (AmostradoresLojasUnidades alu : lstAmostradoresLojasUnidades) {
                JSONObject item = new JSONObject();
                item.put("idAmostrador", alu.getAmostradoresLojasUnidadesPK().getAmostrador().getIdAmostrador());
                item.put("idLoja", alu.getAmostradoresLojasUnidadesPK().getLoja().getIdLoja());
                item.put("idUnidade", alu.getAmostradoresLojasUnidadesPK().getUnidade().getIdUnidade());
                jsonArray.add(item);
            }

            return Response.ok(new Gson().toJson(jsonArray)).build();

        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @POST
    @Path("/gravarColeta")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    public Response gravarColeta(String coleta) {
        try {
            coletaAmostraService = new ColetaAmostraServiceImpl();
            JSONArray json = (JSONArray) new JSONParser().parse(coleta);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Locale("pt", "BR"));
            SimpleDateFormat sdfHora = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", new Locale("pt", "BR"));

            for (Object object : json) {
                ColetaAmostra coletaAmostra = new ColetaAmostra();
                JSONObject jsonObject = ((JSONObject) object);
                coletaAmostra.setAmostrador(jsonObject.get("amostrador").toString());
                coletaAmostra.setLoja(jsonObject.get("loja").toString());
                coletaAmostra.setUnidade(jsonObject.get("unidade").toString());
                coletaAmostra.setDataColeta(sdf.parse(jsonObject.get("dataColeta").toString()));
                coletaAmostra.setHoraColeta(sdfHora.parse(jsonObject.get("horaColeta").toString()));
                coletaAmostra.setHoraReal(sdfHora.parse(jsonObject.get("horaReal").toString()));
                coletaAmostra.setProduto(jsonObject.get("produto").toString());
                coletaAmostra.setAtividade(jsonObject.get("atividade").toString());
                coletaAmostra.setStatusAmostra("OK");
                if (jsonObject.get("funcionario") != null) {
                    coletaAmostra.setFuncionario(jsonObject.get("funcionario").toString());
                }
                coletaAmostraService.gravarColeta(coletaAmostra);
            }

            return Response.ok().build();
        } catch (JsonSyntaxException e) {
            return Response.serverError().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
