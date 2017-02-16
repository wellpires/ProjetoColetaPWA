package br.com.everis.coletaws.amostradoreslojasunidades.service.impl;

import br.com.everis.coletaws.amostradoreslojasunidades.dao.IAmostradoresLojasUnidadesDAO;
import br.com.everis.coletaws.amostradoreslojasunidades.dao.impl.AmostradoresLojasUnidadesDAOImpl;
import br.com.everis.coletaws.amostradoreslojasunidades.model.AmostradoresLojasUnidades;
import br.com.everis.coletaws.amostradoreslojasunidades.service.IAmostradoresLojasUnidadesService;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AmostradoresLojasUnidadesServiceImpl implements IAmostradoresLojasUnidadesService{

    private IAmostradoresLojasUnidadesDAO amostradoresLojasUnidadesDAO = null;
    
    @Override
    public List<AmostradoresLojasUnidades> buscarAmostradoresLojasUnidades() {
        amostradoresLojasUnidadesDAO = new AmostradoresLojasUnidadesDAOImpl();
        return amostradoresLojasUnidadesDAO.buscarAmostradoresLojasUnidades();
    }
    
}
