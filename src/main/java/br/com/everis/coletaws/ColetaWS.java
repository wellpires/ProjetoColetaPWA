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
import br.com.everis.coletaws.produto.service.ProdutoServiceImpl;
import br.com.everis.coletaws.unidade.model.Unidade;
import br.com.everis.coletaws.unidade.service.IUnidadeService;
import br.com.everis.coletaws.unidade.service.impl.UnidadeServiceImpl;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
            for (Amostrador a : lstAmostradores) {
                a.setUnidades(null);
            }
            return Response.ok(new Gson().toJson(lstAmostradores)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/buscarLojas")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarLojas(@QueryParam("idAmostrador") Integer idAmostrador) {
        try {
            lojaService = new LojaServiceImpl();
            Amostrador amostrador = new Amostrador();
            amostrador.setIdAmostrador(idAmostrador);
            List<Loja> lstLoja = lojaService.buscarLojas(amostrador);
            return Response.ok(new Gson().toJson(lstLoja)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/buscarUnidades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarUnidades(@QueryParam("idLoja") Integer idLoja, @QueryParam("idAmostrador") Integer idAmostrador) {
        try {
            unidadeService = new UnidadeServiceImpl();
            Unidade unidade = new Unidade();
            unidade.setLoja(new Loja());
            unidade.setAmostrador(new Amostrador());
            unidade.getAmostrador().setIdAmostrador(idAmostrador);
            unidade.getLoja().setIdLoja(idLoja);

            List<Unidade> lstUnidades = unidadeService.buscarUnidades(unidade);
            return Response.ok(new Gson().toJson(lstUnidades)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }

    }

    @GET
    @Path("/buscarFuncionarios")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarFuncionarios(@QueryParam("idAmostrador") Integer idAmostrador, @QueryParam("idLoja") Integer idLoja, @QueryParam("idUnidade") Integer idUnidade) {

        try {
            funcionarioService = new FuncionarioServiceImpl();
            Unidade unidade = new Unidade();
            unidade.setLoja(new Loja());
            unidade.setAmostrador(new Amostrador());
            unidade.getAmostrador().setIdAmostrador(idAmostrador);
            unidade.getLoja().setIdLoja(idLoja);
            unidade.setIdUnidade(idUnidade);

            Funcionario funcionario = new Funcionario();
            funcionario.setUnidade(new Unidade());
            funcionario.getUnidade().setAmostrador(new Amostrador());
            funcionario.getUnidade().setLoja(new Loja());
            funcionario.getUnidade().setIdUnidade(idUnidade);
            funcionario.getUnidade().getAmostrador().setIdAmostrador(idAmostrador);
            funcionario.getUnidade().getLoja().setIdLoja(idLoja);

            List<Funcionario> lstUnidade = funcionarioService.buscarFuncionarios(funcionario);
            return Response.ok(new Gson().toJson(lstUnidade)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }

    }

    @GET
    @Path("/buscarProdutosAtividades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarProdutos(@QueryParam("idLoja") Integer idLoja) {
        try {
            produtoService = new ProdutoServiceImpl();
            Produto produto = new Produto();
            produto.setLoja(new Loja());
            produto.getLoja().setIdLoja(idLoja);
            List<Produto> lstProdutos = produtoService.buscarProdutos(produto);

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
            coletaAmostraService = new ColetaAmostraServiceImpl();
            ColetaAmostra coletaAmostra = (ColetaAmostra) new Gson().fromJson(coleta, ColetaAmostra.class);
            coletaAmostraService.gravarColeta(coletaAmostra);
            return Response.ok().build();
        } catch (JsonSyntaxException e) {
            return Response.serverError().build();
        } catch(Exception e){
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
