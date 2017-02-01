package br.com.everis.coletaws.loja.model;

import br.com.everis.coletaws.produto.model.Produto;
import br.com.everis.coletaws.unidade.model.Unidade;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Entity
@Table(name = "lojas")
public class Loja implements Serializable {

    public Loja() {
    }
    public Loja(Integer idlLoja, String nomeLoja) {
        this.idLoja = idlLoja;
        this.nomeLoja = nomeLoja;
    }

    
    
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_loja")
    private Integer idLoja = null;
    
    @Column(name = "loja", nullable = false, length = 60)
    private String nomeLoja = null;

    @OneToMany(mappedBy = "loja", cascade=CascadeType.ALL)
    private List<Unidade> unidades = null;
    
    @OneToMany(mappedBy = "loja", cascade=CascadeType.ALL)
    private List<Produto> produtos = null;
    
    public Integer getIdLoja() {
        return idLoja;
    }

    public void setIdLoja(Integer idLoja) {
        this.idLoja = idLoja;
    }

    public String getNomeLoja() {
        return nomeLoja;
    }

    public void setNomeLoja(String nomeLoja) {
        this.nomeLoja = nomeLoja;
    }

    public List<Unidade> getUnidades() {
        return unidades;
    }

    public void setUnidades(List<Unidade> unidades) {
        this.unidades = unidades;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 67 * hash + Objects.hashCode(this.idLoja);
        hash = 67 * hash + Objects.hashCode(this.nomeLoja);
        hash = 67 * hash + Objects.hashCode(this.unidades);
        hash = 67 * hash + Objects.hashCode(this.produtos);
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
        final Loja other = (Loja) obj;
        if (!Objects.equals(this.nomeLoja, other.nomeLoja)) {
            return false;
        }
        if (!Objects.equals(this.idLoja, other.idLoja)) {
            return false;
        }
        if (!Objects.equals(this.unidades, other.unidades)) {
            return false;
        }
        if (!Objects.equals(this.produtos, other.produtos)) {
            return false;
        }
        return true;
    }
    
    
    
}
