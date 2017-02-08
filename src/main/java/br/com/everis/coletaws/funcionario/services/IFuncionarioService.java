package br.com.everis.coletaws.funcionario.services;

import br.com.everis.coletaws.funcionario.model.Funcionario;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface IFuncionarioService {
    
    public List<Funcionario> buscarFuncionarios();
    
}
