package br.com.everis.coletaws.amostrador.services.impl;

import br.com.everis.coletaws.amostrador.dao.impl.AmostradorDAOImpl;
import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.amostrador.services.IAmostradorService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AmostradorServiceImpl implements IAmostradorService {

    private AmostradorDAOImpl amostradorDAO;
    
    @Override
    public List<Amostrador> buscarAmostradores() throws Exception {
        amostradorDAO = new AmostradorDAOImpl();
        return amostradorDAO.buscarAmostradores();
    }
}
