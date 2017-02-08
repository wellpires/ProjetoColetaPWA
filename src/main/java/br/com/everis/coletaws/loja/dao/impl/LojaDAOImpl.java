package br.com.everis.coletaws.loja.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.loja.dao.ILojaDAO;
import br.com.everis.coletaws.loja.model.Loja;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class LojaDAOImpl extends JpaDao<Integer, Loja> implements ILojaDAO {

    @Override
    public List<Loja> buscarLojas() throws Exception {
        try {
            return entityManager.createQuery("FROM " + entityClass.getName()).getResultList();
        } finally {
            entityManager.close();
        }
    }
}
