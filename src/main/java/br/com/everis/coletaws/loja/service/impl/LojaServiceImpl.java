package br.com.everis.coletaws.loja.service.impl;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.loja.service.ILojaService;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class LojaServiceImpl implements ILojaService {

    @Override
    public List<Loja> buscarLojas(Amostrador amostrador) throws Exception {
        List<Loja> lstLojas = new ArrayList<>();

        for (int i = 1; i < 100; i++) {
            if (amostrador.getIdAmostrador() % i == amostrador.getIdAmostrador()) {
                Loja loja = new Loja();
                loja.setIdLoja(i);
                loja.setNomeLoja("Loja " + i);
                lstLojas.add(loja);
            }
        }
        return lstLojas;
    }

}
