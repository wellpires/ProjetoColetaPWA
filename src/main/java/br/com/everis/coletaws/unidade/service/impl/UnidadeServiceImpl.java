package br.com.everis.coletaws.unidade.service.impl;

import br.com.everis.coletaws.unidade.dao.IUnidadeDAO;
import br.com.everis.coletaws.unidade.dao.impl.UnidadeDAOImpl;
import br.com.everis.coletaws.unidade.model.Unidade;
import br.com.everis.coletaws.unidade.service.IUnidadeService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class UnidadeServiceImpl implements IUnidadeService {

    private IUnidadeDAO unidadeDAO = null;
    
    @Override
    public List<Unidade> buscarUnidades(Unidade unidade) throws Exception {
        unidadeDAO = new UnidadeDAOImpl();
        return unidadeDAO.buscarUnidadePorLojaAmostrador(unidade);
    }


}
