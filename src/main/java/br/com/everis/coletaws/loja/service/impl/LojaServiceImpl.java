package br.com.everis.coletaws.loja.service.impl;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.loja.dao.ILojaDAO;
import br.com.everis.coletaws.loja.dao.impl.LojaDAOImpl;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.loja.service.ILojaService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class LojaServiceImpl implements ILojaService {

    private ILojaDAO lojaDAO = null;
    
    @Override
    public List<Loja> buscarLojas(Amostrador amostrador) throws Exception {
        lojaDAO = new LojaDAOImpl();
        return lojaDAO.buscarLojasPorAmostrador(amostrador);
    }

}
