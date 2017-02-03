/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.everis.coletaws.produto.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.produto.dao.IProdutoDAO;
import br.com.everis.coletaws.produto.model.Produto;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ProdutoDAOImpl extends JpaDao<Integer, Produto> implements IProdutoDAO {

    @Override
    public List<Produto> buscarProdutos(Produto produto) throws Exception {

        try {
            //SELECT P.id_produto, P.produto, P.atividade FROM sysnac.produtos P WHERE P.id_loja = 2
            String strQuery = "SELECT new Produto(P.idProduto, P.nomeProduto, P.atividade) "
                    + "FROM " + entityClass.getName() + " P "
                    + "WHERE P.loja.idLoja = :codigoLoja";

            Query q = entityManager.createQuery(strQuery);
            q.setParameter("codigoLoja", produto.getLoja().getIdLoja());

            return (ArrayList<Produto>) q.getResultList();
        } catch (Exception e) {
            entityManager.close();
            throw new Exception(e);
        }

    }

    @Override
    public void persist(Produto entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void remove(Produto entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Produto findById(Integer id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
