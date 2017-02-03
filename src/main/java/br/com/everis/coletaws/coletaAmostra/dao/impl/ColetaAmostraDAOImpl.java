package br.com.everis.coletaws.coletaAmostra.dao.impl;

import br.com.everis.coletaws.coletaAmostra.dao.IColetaAmostraDAO;
import br.com.everis.coletaws.coletaAmostra.model.ColetaAmostra;
import br.com.everis.coletaws.dao.JpaDao;
import javax.persistence.EntityTransaction;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ColetaAmostraDAOImpl extends JpaDao<Integer, ColetaAmostra> implements IColetaAmostraDAO {

    @Override
    public void persist(ColetaAmostra entity) {

        EntityTransaction tx = entityManager.getTransaction();
        tx.begin();
        try {
            entityManager.persist(entity);
            tx.commit();
        }catch(Exception e){
            tx.rollback();
        }
        finally{
            entityManager.close();
        }
    }
}
