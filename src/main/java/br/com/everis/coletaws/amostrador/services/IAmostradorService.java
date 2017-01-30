package br.com.everis.coletaws.amostrador.services;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IAmostradorService {
    
    public List<Amostrador> buscarAmostradores(Amostrador amostrador);
    
}
