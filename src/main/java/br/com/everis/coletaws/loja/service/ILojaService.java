package br.com.everis.coletaws.loja.service;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.loja.model.Loja;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface ILojaService {
    
    public List<Loja> buscarLojas(Amostrador amostrador) throws Exception;
    
}
