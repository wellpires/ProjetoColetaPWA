package br.com.everis.coletaws.produto.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.produto.dao.IProdutoDAO;
import br.com.everis.coletaws.produto.model.Produto;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ProdutoDAOImpl extends JpaDao<Integer, Produto> implements IProdutoDAO {

    @Override
    public List<Produto> buscarProdutos() throws Exception {
        try {
            //SELECT P.id_produto, P.produto, P.atividade FROM sysnac.produtos P WHERE P.id_loja = 2
            String strQuery = "SELECT new Produto(P.idProduto, P.nomeProduto, P.atividade, P.idLoja) FROM " + entityClass.getName() + " P";
            return entityManager.createQuery(strQuery).getResultList();
        } finally {
            entityManager.close();
        }
    }

}
