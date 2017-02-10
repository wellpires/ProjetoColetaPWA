package br.com.everis.coletaws.atividade.service;

import br.com.everis.coletaws.atividade.model.Atividade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IAtividadeService {
    
    public List<Atividade> buscarAtividades() throws Exception;
    
}
