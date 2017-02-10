package br.com.everis.coletaws.atividade.service.impl;

import br.com.everis.coletaws.atividade.dao.IAtividadeDAO;
import br.com.everis.coletaws.atividade.dao.impl.AtividadeDAOImpl;
import br.com.everis.coletaws.atividade.model.Atividade;
import br.com.everis.coletaws.atividade.service.IAtividadeService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AtividadeServiceImpl implements IAtividadeService{

    private IAtividadeDAO atividadeDAO = null;
    
    @Override
    public List<Atividade> buscarAtividades() throws Exception {
        atividadeDAO = new AtividadeDAOImpl();
        return atividadeDAO.buscarAtividades();
    }
}
