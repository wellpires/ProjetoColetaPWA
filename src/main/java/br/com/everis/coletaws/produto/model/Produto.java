package br.com.everis.coletaws.produto.model;

import br.com.everis.coletaws.loja.model.Loja;
import java.io.Serializable;
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
    
    
}
