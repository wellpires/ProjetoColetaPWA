package br.com.everis.coletaws.unidade.service.impl;

import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.unidade.model.Unidade;
import br.com.everis.coletaws.unidade.service.IUnidadeService;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class UnidadeServiceImpl implements IUnidadeService {

    @Override
    public List<Unidade> buscarUnidades(Loja loja) throws Exception {
        List<Unidade> lstUnidades = new ArrayList<>();

        for (int i = 1; i < 100; i++) {
            if (loja.getIdLoja() % i == loja.getIdLoja()) {
                Unidade unidade = new Unidade();
                unidade.setIdUnidade(i);
                unidade.setNomeUnidade("Unidade " + i);
                lstUnidades.add(unidade);
            }
        }
        return lstUnidades;

    }

}
