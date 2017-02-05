package br.com.everis.coletaws.funcionario.dao;

import br.com.everis.coletaws.dao.Dao;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IFuncionarioDAO extends Dao<Integer, Funcionario> {
    
    public List<Funcionario> buscarFuncionarios(Funcionario funcionario);
    public List<Funcionario> buscarFuncionarios();
    
}
