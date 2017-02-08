package br.com.everis.coletaws.funcionario.model;

import br.com.everis.coletaws.unidade.model.Unidade;
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
@Table(name = "funcionarios")
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;

    public Funcionario() {
    }

    public Funcionario(Long idFuncionario, String nomeFuncionario) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
    }
    
    public Funcionario(Long idFuncionario, String nomeFuncionario, String cargo, Long idUnidade) {
        this.idFuncionario = idFuncionario;
        this.nomeFuncionario = nomeFuncionario;
        this.cargo = cargo;
        this.idUnidade = idUnidade;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_funcionario")
    private Long idFuncionario = null;

    @Column(name = "funcionario", nullable = false, length = 60)
    private String nomeFuncionario = null;

    @Column(name = "cargo", length = 60)
    private String cargo = null;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_unidade")
    private Unidade unidade = null;

    @Column(name = "id_unidade", insertable = false, updatable = false)
    private Long idUnidade = null;

    public Long getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(Long idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public String getNomeFuncionario() {
        return nomeFuncionario;
    }

    public void setNomeFuncionario(String nomeFuncionario) {
        this.nomeFuncionario = nomeFuncionario;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public Long getIdUnidade() {
        return idUnidade;
    }

    public void setIdUnidade(Long idUnidade) {
        this.idUnidade = idUnidade;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 53 * hash + Objects.hashCode(this.idFuncionario);
        hash = 53 * hash + Objects.hashCode(this.nomeFuncionario);
        hash = 53 * hash + Objects.hashCode(this.cargo);
        hash = 53 * hash + Objects.hashCode(this.unidade);
        hash = 53 * hash + Objects.hashCode(this.idUnidade);
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
        final Funcionario other = (Funcionario) obj;
        if (!Objects.equals(this.nomeFuncionario, other.nomeFuncionario)) {
            return false;
        }
        if (!Objects.equals(this.cargo, other.cargo)) {
            return false;
        }
        if (!Objects.equals(this.idFuncionario, other.idFuncionario)) {
            return false;
        }
        if (!Objects.equals(this.unidade, other.unidade)) {
            return false;
        }
        if (!Objects.equals(this.idUnidade, other.idUnidade)) {
            return false;
        }
        return true;
    }

}
