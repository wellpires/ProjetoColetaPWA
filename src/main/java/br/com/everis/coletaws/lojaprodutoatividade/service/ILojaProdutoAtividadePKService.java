package br.com.everis.coletaws.lojaprodutoatividade.service;

import br.com.everis.coletaws.lojaprodutoatividade.model.LojaProdutosAtividade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface ILojaProdutoAtividadePKService {
    
    public List<LojaProdutosAtividade> buscarLojaProdutoAtividade() throws Exception;
    
}
