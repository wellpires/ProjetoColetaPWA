package br.com.everis.coletaws.produto.model;

import br.com.everis.coletaws.loja.model.Loja;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Entity
@Table(name = "produtos")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    public Produto() {
    }
    
    public Produto(Integer idProduto, String nomeProduto, String atividade) {
        this.idProduto = idProduto;
        this.nomeProduto = nomeProduto;
        this.atividade = atividade;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private Integer idProduto = null;
    
    @Column(name = "produto", nullable = false, length = 60)
    private String nomeProduto = null;
    
    @Column(name = "atividade", nullable = false, length = 60)
    private String atividade = null;
    
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_loja")
    private Loja loja = null;

    public Integer getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Integer idProduto) {
        this.idProduto = idProduto;
    }

    public String getNomeProduto() {
        return nomeProduto;
    }

    public void setNomeProduto(String nomeProduto) {
        this.nomeProduto = nomeProduto;
    }

    public String getAtividade() {
        return atividade;
    }

    public void setAtividade(String atividade) {
        this.atividade = atividade;
    }

    public Loja getLoja() {
        return loja;
    }

    public void setLoja(Loja loja) {
        this.loja = loja;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 41 * hash + Objects.hashCode(this.idProduto);
        hash = 41 * hash + Objects.hashCode(this.nomeProduto);
        hash = 41 * hash + Objects.hashCode(this.atividade);
        hash = 41 * hash + Objects.hashCode(this.loja);
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
        final Produto other = (Produto) obj;
        if (!Objects.equals(this.nomeProduto, other.nomeProduto)) {
            return false;
        }
        if (!Objects.equals(this.atividade, other.atividade)) {
            return false;
        }
        if (!Objects.equals(this.idProduto, other.idProduto)) {
            return false;
        }
        if (!Objects.equals(this.loja, other.loja)) {
            return false;
        }
        return true;
    }
    
    
    
    
}
