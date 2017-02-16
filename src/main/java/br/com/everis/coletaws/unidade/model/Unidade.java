package br.com.everis.coletaws.unidade.model;

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
@Table(name = "unidades")
public class Unidade implements Serializable {

    private static final long serialVersionUID = 1L;

    public Unidade() {
    }

    public Unidade(Long idUnidade, String nomeUnidade) {
        this.idUnidade = idUnidade;
        this.nomeUnidade = nomeUnidade;
    }

    public Unidade(Long idUnidade, String nomeUnidade, Long idLoja) {
        this.idUnidade = idUnidade;
        this.nomeUnidade = nomeUnidade;
        this.idLoja = idLoja;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidade")
    private Long idUnidade = null;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_loja")
    private Loja loja = null;

    @Column(name = "unidade", nullable = false, length = 60)
    private String nomeUnidade = null;

    @Column(name = "id_loja", insertable = false, updatable = false)
    private Long idLoja = null;

    @Column(name = "segmento", length = 60)
    private String segmento = null;

    public Long getIdUnidade() {
        return idUnidade;
    }

    public void setIdUnidade(Long idUnidade) {
        this.idUnidade = idUnidade;
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

    public Long getIdLoja() {
        return idLoja;
    }

    public void setIdLoja(Long idLoja) {
        this.idLoja = idLoja;
    }

    public String getSegmento() {
        return segmento;
    }

    public void setSegmento(String segmento) {
        this.segmento = segmento;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.idUnidade);
        hash = 29 * hash + Objects.hashCode(this.loja);
        hash = 29 * hash + Objects.hashCode(this.nomeUnidade);
        hash = 29 * hash + Objects.hashCode(this.idLoja);
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
        if (!Objects.equals(this.loja, other.loja)) {
            return false;
        }
        if (!Objects.equals(this.idLoja, other.idLoja)) {
            return false;
        }
        return true;
    }
}
