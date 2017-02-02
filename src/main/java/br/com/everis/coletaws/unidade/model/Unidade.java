package br.com.everis.coletaws.unidade.model;

import br.com.everis.coletaws.amostrador.model.Amostrador;
import br.com.everis.coletaws.funcionario.model.Funcionario;
import br.com.everis.coletaws.loja.model.Loja;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Entity
@Table(name = "unidades")
public class Unidade implements Serializable {

    private static final long serialVersionUID = 1L;

    public Unidade() {
    }

    public Unidade(Integer idUnidade, String nomeUnidade) {
        this.idUnidade = idUnidade;
        this.nomeUnidade = nomeUnidade;
    }

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

    @OneToMany(mappedBy = "unidade", cascade = CascadeType.ALL)
    private List<Funcionario> funcionario = null;

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

    public List<Funcionario> getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(List<Funcionario> funcionario) {
        this.funcionario = funcionario;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.idUnidade);
        hash = 29 * hash + Objects.hashCode(this.amostrador);
        hash = 29 * hash + Objects.hashCode(this.loja);
        hash = 29 * hash + Objects.hashCode(this.nomeUnidade);
        hash = 29 * hash + Objects.hashCode(this.funcionario);
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
        final Unidade other = (Unidade) obj;
        if (!Objects.equals(this.nomeUnidade, other.nomeUnidade)) {
            return false;
        }
        if (!Objects.equals(this.idUnidade, other.idUnidade)) {
            return false;
        }
        if (!Objects.equals(this.amostrador, other.amostrador)) {
            return false;
        }
        if (!Objects.equals(this.loja, other.loja)) {
            return false;
        }
        if (!Objects.equals(this.funcionario, other.funcionario)) {
            return false;
        }
        return true;
    }
    
}
