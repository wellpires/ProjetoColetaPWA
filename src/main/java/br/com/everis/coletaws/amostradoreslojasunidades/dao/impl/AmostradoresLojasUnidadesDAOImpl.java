package br.com.everis.coletaws.amostradoreslojasunidades.dao.impl;

import br.com.everis.coletaws.amostradoreslojasunidades.dao.IAmostradoresLojasUnidadesDAO;
import br.com.everis.coletaws.amostradoreslojasunidades.model.AmostradoresLojasUnidades;
import br.com.everis.coletaws.dao.JpaDao;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AmostradoresLojasUnidadesDAOImpl extends JpaDao<Integer, AmostradoresLojasUnidades> implements IAmostradoresLojasUnidadesDAO{

    @Override
    public List<AmostradoresLojasUnidades> buscarAmostradoresLojasUnidades() {
        try{
            return entityManager.createQuery("FROM " + entityClass.getName()).getResultList();
        }finally{
            entityManager.close();
        }
    }
}
