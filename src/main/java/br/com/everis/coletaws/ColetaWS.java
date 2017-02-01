package br.com.everis.coletaws;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.amostrador.services.IAmostradorService;
import br.com.everis.coletaws.amostrador.services.impl.AmostradorServiceImpl;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.loja.service.ILojaService;
import br.com.everis.coletaws.loja.service.impl.LojaServiceImpl;
import br.com.everis.coletaws.unidade.model.Unidade;
import br.com.everis.coletaws.unidade.service.IUnidadeService;
import br.com.everis.coletaws.unidade.service.impl.UnidadeServiceImpl;
import br.com.everis.coletaws.utils.JPAUtil;
import com.google.gson.Gson;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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

    private IAmostradorService amostradorService = null;
    private ILojaService lojaService = null;
    private IUnidadeService unidadeService = null;
    
    @GET
    @Path("/buscarAmostrador")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarAmostrador() {
        try {
            amostradorService = new AmostradorServiceImpl();
            List<Amostrador> lstAmostradores = amostradorService.buscarAmostradores();
            for(Amostrador a : lstAmostradores){
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
        } catch (Exception e) {e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @GET
    @Path("/buscarUnidades")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_PLAIN)
    public Response buscarUnidades(@QueryParam("idLoja") Integer idLoja) {
        try {
            unidadeService = new UnidadeServiceImpl();
            Loja loja = new Loja();
            loja.setIdLoja(idLoja);
            List<Unidade> lstUnidades = unidadeService.buscarUnidades(loja);
            return Response.ok(new Gson().toJson(lstUnidades)).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }

    }

}
