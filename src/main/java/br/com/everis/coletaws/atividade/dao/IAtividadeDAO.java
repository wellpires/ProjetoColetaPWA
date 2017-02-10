package br.com.everis.coletaws.atividade.dao;

import br.com.everis.coletaws.atividade.model.Atividade;
import br.com.everis.coletaws.dao.Dao;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IAtividadeDAO  extends Dao<Integer, Atividade>{
    
    public List<Atividade> buscarAtividades() throws Exception;
    
}
