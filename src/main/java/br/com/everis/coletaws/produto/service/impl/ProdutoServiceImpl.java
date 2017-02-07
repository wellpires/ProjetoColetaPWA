package br.com.everis.coletaws.produto.service.impl;

import br.com.everis.coletaws.produto.dao.IProdutoDAO;
import br.com.everis.coletaws.produto.dao.impl.ProdutoDAOImpl;
import br.com.everis.coletaws.produto.model.Produto;
import br.com.everis.coletaws.produto.service.IProdutoService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ProdutoServiceImpl implements IProdutoService {

    private IProdutoDAO produtoDAO = null;

    @Override
    public List<Produto> buscarProdutos() throws Exception {
        produtoDAO = new ProdutoDAOImpl();
        return produtoDAO.buscarProdutos();
    }
}
