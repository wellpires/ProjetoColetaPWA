
package br.com.everis.coletaws;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Path("ColetaWS")
public class ColetaWS {
    
    @GET
    @Path("/mostrarValor")
    @Produces(MediaType.TEXT_PLAIN)
    public String mostrarValor(){
        return "RENE VIADÃO";
    }

    
}
