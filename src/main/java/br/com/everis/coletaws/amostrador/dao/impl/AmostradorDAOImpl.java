package br.com.everis.coletaws.amostrador.dao.impl;

import br.com.everis.coletaws.amostrador.dao.IAmostradorDAO;
import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.dao.JpaDao;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AmostradorDAOImpl extends JpaDao<Integer, Amostrador> implements IAmostradorDAO {

    @Override
    public List<Amostrador> buscarAmostradores() throws Exception {
        try {
            return entityManager.createQuery("FROM " + Amostrador.class.getName()).getResultList();
        } catch (Exception e) {
            entityManager.close();
            throw new Exception(e);
        }
    }

}
