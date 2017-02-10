package br.com.everis.coletaws.atividade.dao.impl;

import br.com.everis.coletaws.atividade.dao.IAtividadeDAO;
import br.com.everis.coletaws.atividade.model.Atividade;
import br.com.everis.coletaws.dao.JpaDao;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AtividadeDAOImpl extends JpaDao<Integer, Atividade> implements IAtividadeDAO {

    @Override
    public List<Atividade> buscarAtividades() throws Exception {
        try {
            String strQuery = "SELECT new Atividade(A.idAtividade, A.nomeAtividade) FROM " + entityClass.getName() + " A";
            return entityManager.createQuery(strQuery).getResultList();
        } finally {
            entityManager.close();
        }
    }
}
