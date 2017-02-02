package br.com.everis.coletaws.unidade.service;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.unidade.model.Unidade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IUnidadeService {
    
    public List<Unidade> buscarUnidades(Loja loja, Amostrador amostrador) throws Exception;
    
}
