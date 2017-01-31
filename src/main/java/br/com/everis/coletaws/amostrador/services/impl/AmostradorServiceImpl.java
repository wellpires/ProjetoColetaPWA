package br.com.everis.coletaws.amostrador.services.impl;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.amostrador.services.IAmostradorService;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class AmostradorServiceImpl implements IAmostradorService {

    @Override
    public List<Amostrador> buscarAmostradores() throws Exception {
        List<Amostrador> lstAmostradores = new ArrayList<>();

        for (int i = 1; i < 100; i++) {
            Amostrador a = new Amostrador();
            a.setIdAmostrador(i);
            a.setNomeAmostrador("Amostrador " + i);
            lstAmostradores.add(a);
        }
        return lstAmostradores;

    }

}
