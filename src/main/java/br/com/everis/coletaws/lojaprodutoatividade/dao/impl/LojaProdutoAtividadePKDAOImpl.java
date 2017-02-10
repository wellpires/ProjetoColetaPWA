package br.com.everis.coletaws.lojaprodutoatividade.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.lojaprodutoatividade.dao.ILojaProdutoAtividadePKDAO;
import br.com.everis.coletaws.lojaprodutoatividade.model.LojaProdutosAtividade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class LojaProdutoAtividadePKDAOImpl extends JpaDao<Integer, LojaProdutosAtividade> implements ILojaProdutoAtividadePKDAO {

    @Override
    public List<LojaProdutosAtividade> buscarLojaProdutoAtividade() throws Exception {
        try {
            String strQuery = "SELECT LPA FROM " + entityClass.getName() + " LPA";
            return entityManager.createQuery(strQuery).getResultList();
        } finally {
            entityManager.close();
        }
    }
}
