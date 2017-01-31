package br.com.everis.coletaws.unidade.model;

import br.com.everis.coletaws.amostrador.model.Amostrador;
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
@Table(name = "unidades")
public class Unidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidade")
    private Integer idUnidade = null;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_amostrador")
    private Amostrador amostrador = null;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_loja")
    private Loja loja = null;

    @Column(name = "unidade", nullable = false, length = 60)
    private String nomeUnidade = null;
    
    @Column(name = "funcionario", nullable = false, length = 60)
    private String funcionario = null;

    public Integer getIdUnidade() {
        return idUnidade;
    }

    public void setIdUnidade(Integer idUnidade) {
        this.idUnidade = idUnidade;
    }

    public Amostrador getAmostrador() {
        return amostrador;
    }

    public void setAmostrador(Amostrador amostrador) {
        this.amostrador = amostrador;
    }

    public Loja getLoja() {
        return loja;
    }

    public void setLoja(Loja loja) {
        this.loja = loja;
    }

    public String getNomeUnidade() {
        return nomeUnidade;
    }

    public void setNomeUnidade(String nomeUnidade) {
        this.nomeUnidade = nomeUnidade;
    }

    public String getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(String funcionario) {
        this.funcionario = funcionario;
    }

}
