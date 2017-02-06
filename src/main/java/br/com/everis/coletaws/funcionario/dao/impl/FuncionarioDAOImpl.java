package br.com.everis.coletaws.funcionario.dao.impl;

import br.com.everis.coletaws.dao.JpaDao;
import br.com.everis.coletaws.funcionario.dao.IFuncionarioDAO;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Query;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class FuncionarioDAOImpl extends JpaDao<Integer, Funcionario> implements IFuncionarioDAO {

    @Override
    public List<Funcionario> buscarFuncionarios(Funcionario funcionario) {
        //SELECT F.id_funcionario, F.funcionario 
        //FROM sysnac.funcionarios F INNER JOIN sysnac.unidades U ON 
        //U.id_unidade = F.id_unidade WHERE F.id_unidade = 1 AND U.id_loja = 1 AND U.id_amostrador = 1

        String strQuery = "SELECT new Funcionario(F.idFuncionario, F.nomeFuncionario) "
                + "FROM " + entityClass.getName() + " F "
                + "JOIN F.unidade AS U WHERE "
                + "U.amostrador.idAmostrador = :codigoAmostrador AND "
                + "U.loja.idLoja = :codigoLoja AND U.idUnidade = :codigo";

        Query q = entityManager.createQuery(strQuery);
        q.setParameter("codigoAmostrador", funcionario.getUnidade().getAmostrador().getIdAmostrador());
        q.setParameter("codigoLoja", funcionario.getUnidade().getLoja().getIdLoja());
        q.setParameter("codigo", funcionario.getUnidade().getIdUnidade());

        return (ArrayList<Funcionario>) q.getResultList();
    }

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

    @Override
    public void persist(Funcionario entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void remove(Funcionario entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Funcionario findById(Integer id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
