package br.com.everis.coletaws.loja.dao;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.dao.Dao;
import br.com.everis.coletaws.loja.model.Loja;
import java.util.List;


/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface ILojaDAO extends Dao<Integer, Loja> {
    
    public List<Loja> buscarLojasPorAmostrador(Amostrador amostrador);
    
}
