package br.com.everis.coletaws.produto.service;

import br.com.everis.coletaws.produto.dao.IProdutoDAO;
import br.com.everis.coletaws.produto.dao.impl.ProdutoDAOImpl;
import br.com.everis.coletaws.produto.model.Produto;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ProdutoServiceImpl implements IProdutoService {

    private IProdutoDAO produtoDAO = null;

    @Override
    public List<Produto> buscarProdutos(Produto produto) throws Exception{
        try {
            produtoDAO = new ProdutoDAOImpl();
            return produtoDAO.buscarProdutos(produto);
        } catch (Exception ex) {
            throw new Exception(ex);
        }
    }
}
