package br.com.everis.coletaws.funcionario.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.funcionario.dao.IFuncionarioDAO;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class FuncionarioDAOImpl extends JpaDao<Integer, Funcionario> implements IFuncionarioDAO {

    @Override
    public List<Funcionario> buscarFuncionarios() {
        try {
            String strQuery = "SELECT new Funcionario(F.idFuncionario, F.nomeFuncionario,F.cargo, F.unidade.idUnidade) "
                    + "FROM " + entityClass.getName() + " F";
            return entityManager.createQuery(strQuery).getResultList();
        } finally {
            entityManager.close();
        }
    }
}
