package br.com.everis.coletaws.lojaprodutoatividade.service.impl;

import br.com.everis.coletaws.lojaprodutoatividade.dao.ILojaProdutoAtividadePKDAO;
import br.com.everis.coletaws.lojaprodutoatividade.dao.impl.LojaProdutoAtividadePKDAOImpl;
import br.com.everis.coletaws.lojaprodutoatividade.model.LojaProdutosAtividade;
import br.com.everis.coletaws.lojaprodutoatividade.service.ILojaProdutoAtividadePKService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class LojaProdutoAtividadePKServiceImpl implements ILojaProdutoAtividadePKService{

    private ILojaProdutoAtividadePKDAO lojaProdutoAtividadePKDAO = null;
    
    @Override
    public List<LojaProdutosAtividade> buscarLojaProdutoAtividade() throws Exception {
        lojaProdutoAtividadePKDAO = new LojaProdutoAtividadePKDAOImpl();
        return lojaProdutoAtividadePKDAO.buscarLojaProdutoAtividade();
    }
    
}
