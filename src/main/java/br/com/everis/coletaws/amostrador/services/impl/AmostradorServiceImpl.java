package br.com.everis.coletaws.amostrador.services.impl;

import br.com.everis.coletaws.amostrador.dao.IAmostradorDAO;
import br.com.everis.coletaws.amostrador.dao.impl.AmostradorDAOImpl;
import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.amostrador.services.IAmostradorService;
import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Named
public class AmostradorServiceImpl implements IAmostradorService {

    
    @Inject
    @Named("amostradorDAOImpl")
    private IAmostradorDAO amostradorDAO;
    
    @Override
    public List<Amostrador> buscarAmostradores() throws Exception {
        amostradorDAO = new AmostradorDAOImpl();
        return amostradorDAO.buscarAmostradores();
    }

    public IAmostradorDAO getAmostradorDAO() {
        return amostradorDAO;
    }

    public void setAmostradorDAO(IAmostradorDAO amostradorDAO) {
        this.amostradorDAO = amostradorDAO;
    }

    
}
