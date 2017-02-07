package br.com.everis.coletaws.unidade.dao;

import br.com.everis.coletaws.dao.Dao;
import br.com.everis.coletaws.unidade.model.Unidade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IUnidadeDAO extends Dao<Integer, Unidade>{
    
    public List<Unidade> buscarUnidades() throws Exception;
    
}
