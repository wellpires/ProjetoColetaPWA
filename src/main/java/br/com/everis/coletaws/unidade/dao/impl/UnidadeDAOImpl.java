package br.com.everis.coletaws.unidade.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.unidade.dao.IUnidadeDAO;
import br.com.everis.coletaws.unidade.model.Unidade;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class UnidadeDAOImpl extends JpaDao<Integer, Unidade> implements IUnidadeDAO {

    @Override
    public List<Unidade> buscarUnidades() throws Exception {
        try {
            return entityManager.createQuery("SELECT new Unidade(U.idUnidade, U.nomeUnidade, U.loja.idLoja) FROM " + entityClass.getName() + " U").getResultList();
        } finally {
            entityManager.close();
        }
    }
}
