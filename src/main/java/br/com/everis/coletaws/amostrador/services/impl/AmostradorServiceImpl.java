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
    public List<Amostrador> buscarAmostradores(Amostrador amostrador) {
        List<Amostrador> lstAmostradores = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            Amostrador a = new Amostrador();
            a.setIdAmostrador(i);
            a.setNomeAmostrador("Amostrador " + i);
            lstAmostradores.add(a);
        }
        return lstAmostradores;

    }

}
