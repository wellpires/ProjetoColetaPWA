package br.com.everis.coletaws.produto.service;

import br.com.everis.coletaws.produto.model.Produto;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IProdutoService {
    
    public List<Produto> buscarProdutos(Produto produto) throws Exception;
    public List<Produto> buscarProdutos() throws Exception;
    
}
