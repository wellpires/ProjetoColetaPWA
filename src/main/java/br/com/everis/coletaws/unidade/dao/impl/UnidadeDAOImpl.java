package br.com.everis.coletaws.unidade.dao.impl;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.unidade.dao.IUnidadeDAO;
import br.com.everis.coletaws.unidade.model.Unidade;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class UnidadeDAOImpl extends JpaDao<Integer, Unidade> implements IUnidadeDAO{

    @Override
    public List<Unidade> buscarUnidadePorLojaAmostrador(Loja loja, Amostrador amostrador) {
        //SELECT U.id_unidade, U.unidade FROM sysnac.unidades U WHERE U.id_amostrador = 1 AND U.id_loja = 1
        String sqlQuery = "SELECT distinct new Unidade(U.idUnidade, U.nomeUnidade )"
                + "FROM " + Unidade.class.getName() + " U WHERE U.amostrador.idAmostrador = :codigoAmostrador AND U.loja.idLoja = :codigoLoja";
        Query q = entityManager.createQuery(sqlQuery);
        q.setParameter("codigoAmostrador", amostrador.getIdAmostrador());
        q.setParameter("codigoLoja", loja.getIdLoja());
        
        return q.getResultList();
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
