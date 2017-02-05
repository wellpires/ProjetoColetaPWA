package br.com.everis.coletaws.unidade.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.unidade.dao.IUnidadeDAO;
import br.com.everis.coletaws.unidade.model.Unidade;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class UnidadeDAOImpl extends JpaDao<Integer, Unidade> implements IUnidadeDAO {

    @Override
    public List<Unidade> buscarUnidadePorLojaAmostrador(Unidade unidade) throws Exception {
        //SELECT U.id_unidade, U.unidade FROM sysnac.unidades U WHERE U.id_amostrador = 1 AND U.id_loja = 1
        try {
            String sqlQuery = "SELECT distinct new Unidade(U.idUnidade, U.nomeUnidade) "
                    + "FROM " + Unidade.class.getName() + " U WHERE U.amostrador.idAmostrador = :codigoAmostrador AND U.loja.idLoja = :codigoLoja";
            Query q = entityManager.createQuery(sqlQuery);
            q.setParameter("codigoAmostrador", unidade.getAmostrador().getIdAmostrador());
            q.setParameter("codigoLoja", unidade.getLoja().getIdLoja());
            return q.getResultList();
        } catch (Exception e) {
            entityManager.close();
            throw new Exception(e);
        }

    }

    @Override
    public List<Unidade> buscarUnidades() throws Exception {
        try {
            return entityManager.createQuery("FROM " + entityClass.getName()).getResultList();
        } catch (Exception e) {
            throw new Exception(e);
        } finally {
            entityManager.close();
        }
    }

    @Override
    public void persist(Unidade entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void remove(Unidade entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Unidade findById(Integer id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
