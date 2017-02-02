package br.com.everis.coletaws.unidade.service;

import br.com.everis.coletaws.unidade.model.Unidade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IUnidadeService {
    
    public List<Unidade> buscarUnidades(Unidade unidade) throws Exception;
    
}
