package br.com.everis.coletaws.loja.dao.impl;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.loja.dao.ILojaDAO;
import br.com.everis.coletaws.loja.model.Loja;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class LojaDAOImpl extends JpaDao<Integer, Loja> implements ILojaDAO {

    @Override
    public List<Loja> buscarLojasPorAmostrador(Amostrador amostrador) {
        //SELECT DISTINCT(L.loja) FROM sysnac.lojas L INNER JOIN sysnac.unidades U ON U.id_loja = L.id_loja AND U.id_amostrador = 1

        String sqlQuery = "SELECT distinct new Loja(l.idLoja, l.nomeLoja )"
                + "FROM " + entityClass.getName() + " l JOIN l.unidades as u where u.amostrador.idAmostrador = :codigoAmostrador";

        Query q = entityManager.createQuery(sqlQuery).setParameter("codigoAmostrador", amostrador.getIdAmostrador());
        return q.getResultList();
    }

    @Override
    public List<Loja> buscarLojas() throws Exception {
        try {
            return entityManager.createQuery("FROM " + entityClass.getName()).getResultList();
        } finally {
            entityManager.close();
        }
    }

}
