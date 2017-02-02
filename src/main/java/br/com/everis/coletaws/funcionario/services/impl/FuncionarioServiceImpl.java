package br.com.everis.coletaws.funcionario.services.impl;

import br.com.everis.coletaws.funcionario.dao.IFuncionarioDAO;
import br.com.everis.coletaws.funcionario.dao.impl.FuncionarioDAOImpl;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import br.com.everis.coletaws.funcionario.services.IFuncionarioService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class FuncionarioServiceImpl implements IFuncionarioService{

    private IFuncionarioDAO funcionarioDAO = null;
    
    @Override
    public List<Funcionario> buscarFuncionarios(Funcionario funcionario) {
        funcionarioDAO = new FuncionarioDAOImpl();
        return funcionarioDAO.buscarFuncionarios(funcionario);
    }
    
}
