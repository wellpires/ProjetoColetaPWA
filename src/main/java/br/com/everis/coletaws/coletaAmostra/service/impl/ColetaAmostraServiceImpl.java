package br.com.everis.coletaws.coletaAmostra.service.impl;

import br.com.everis.coletaws.coletaAmostra.dao.IColetaAmostraDAO;
import br.com.everis.coletaws.coletaAmostra.dao.impl.ColetaAmostraDAOImpl;
import br.com.everis.coletaws.coletaAmostra.model.ColetaAmostra;
import br.com.everis.coletaws.coletaAmostra.service.IColetaAmostraService;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ColetaAmostraServiceImpl implements IColetaAmostraService{

    private IColetaAmostraDAO coletaAmostraDAO = null;
    
    @Override
    public void gravarColeta(ColetaAmostra coletaAmostra) {
        coletaAmostraDAO = new ColetaAmostraDAOImpl();
        coletaAmostraDAO.persist(coletaAmostra);
    }
    
}
