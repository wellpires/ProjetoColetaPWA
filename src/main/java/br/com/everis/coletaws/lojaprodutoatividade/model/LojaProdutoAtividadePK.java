package br.com.everis.coletaws.lojaprodutoatividade.model;

import br.com.everis.coletaws.atividade.model.Atividade;
import br.com.everis.coletaws.loja.model.Loja;
import br.com.everis.coletaws.produto.model.Produto;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

/**
 *
 * @author Wellington Gonçalves Pires
 */

@Embeddable
public class LojaProdutoAtividadePK implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    private Loja loja = null;
    
    private Produto produto = null;
    
    private Atividade atividade = null;

    @ManyToOne
    public Loja getLoja() {
        return loja;
    }

    public void setLoja(Loja loja) {
        this.loja = loja;
    }

    @ManyToOne
    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    @ManyToOne
    public Atividade getAtividade() {
        return atividade;
    }

    public void setAtividade(Atividade atividade) {
        this.atividade = atividade;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.loja);
        hash = 97 * hash + Objects.hashCode(this.produto);
        hash = 97 * hash + Objects.hashCode(this.atividade);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final LojaProdutoAtividadePK other = (LojaProdutoAtividadePK) obj;
        if (!Objects.equals(this.loja, other.loja)) {
            return false;
        }
        if (!Objects.equals(this.produto, other.produto)) {
            return false;
        }
        if (!Objects.equals(this.atividade, other.atividade)) {
            return false;
        }
        return true;
    }
    
}
