package br.com.everis.coletaws.loja.model;

import br.com.everis.coletaws.produto.model.Produto;
import java.io.Serializable;
import java.util.List;
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

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_loja")
    private Integer idLoja = null;
    
    @Column(name = "loja", nullable = false, length = 60)
    private String nomeLoja = null;

    @OneToMany(mappedBy = "lojas")
    private List<Loja> lojas = null;
    
    @OneToMany(mappedBy = "lojas")
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

    public List<Loja> getLojas() {
        return lojas;
    }

    public void setLojas(List<Loja> lojas) {
        this.lojas = lojas;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
    
}
