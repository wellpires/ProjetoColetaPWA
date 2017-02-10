package br.com.everis.coletaws.atividade.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Entity
@Table(name = "atividades")
public class Atividade implements Serializable {

    private static final long serialVersionUID = 1L;

    public Atividade() {

    }

    public Atividade(Long idAtividade, String nomeAtividade) {
        this.idAtividade = idAtividade;
        this.nomeAtividade = nomeAtividade;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_atividade")
    private Long idAtividade = null;

    @Column(name = "atividade", nullable = false, length = 60)
    private String nomeAtividade = null;

    public Long getIdAtividade() {
        return idAtividade;
    }

    public void setIdAtividade(Long idAtividade) {
        this.idAtividade = idAtividade;
    }

    public String getNomeAtividade() {
        return nomeAtividade;
    }

    public void setNomeAtividade(String nomeAtividade) {
        this.nomeAtividade = nomeAtividade;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 29 * hash + Objects.hashCode(this.idAtividade);
        hash = 29 * hash + Objects.hashCode(this.nomeAtividade);
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
        final Atividade other = (Atividade) obj;
        if (!Objects.equals(this.nomeAtividade, other.nomeAtividade)) {
            return false;
        }
        if (!Objects.equals(this.idAtividade, other.idAtividade)) {
            return false;
        }
        return true;
    }

}
