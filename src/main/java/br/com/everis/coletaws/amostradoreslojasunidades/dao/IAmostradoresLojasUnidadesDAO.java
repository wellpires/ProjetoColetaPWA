package br.com.everis.coletaws.amostradoreslojasunidades.dao;

import br.com.everis.coletaws.amostradoreslojasunidades.model.AmostradoresLojasUnidades;
import br.com.everis.coletaws.dao.Dao;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IAmostradoresLojasUnidadesDAO extends Dao<Integer, AmostradoresLojasUnidades>{
    
    public List<AmostradoresLojasUnidades> buscarAmostradoresLojasUnidades();
    
}
