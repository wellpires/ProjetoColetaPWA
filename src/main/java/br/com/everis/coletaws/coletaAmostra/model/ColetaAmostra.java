package br.com.everis.coletaws.coletaAmostra.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Entity
@Table(name = "coleta_amostra")
public class ColetaAmostra implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_amostra")
    private Integer idAmostra = null;
    
    @Column(name = "amostrador", nullable = false, length = 60)
    private String amostrador = null;
    
    @Column(name = "loja", nullable = false, length = 60)
    private String loja = null;
    
    @Column(name = "unidade", nullable = false, length = 60)
    private String unidade = null;
    
    @Column(name = "data_coleta", nullable = false)
    @Temporal(value = TemporalType.DATE)
    private Date data_coleta = null;
    
    @Column(name = "hora_coleta", nullable = false)
    @Temporal(value = TemporalType.TIME)
    private Date hora_coleta = null;
    
    @Column(name = "hora_real", nullable = false)
    @Temporal(value = TemporalType.TIME)
    private Date ts_sincronismo = null;

    @Column(name = "produto", nullable = false, length = 60)
    private String produto = null;
    
    @Column(name = "atividade", nullable = false, length = 60)
    private String atividade = null;
    
    @Column(name = "status_amostra", nullable = false, length = 60)
    private String status_amostra = null;

    public Integer getIdAmostra() {
        return idAmostra;
    }

    public void setIdAmostra(Integer idAmostra) {
        this.idAmostra = idAmostra;
    }

    public String getAmostrador() {
        return amostrador;
    }

    public void setAmostrador(String amostrador) {
        this.amostrador = amostrador;
    }

    public String getLoja() {
        return loja;
    }

    public void setLoja(String loja) {
        this.loja = loja;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public Date getData_coleta() {
        return data_coleta;
    }

    public void setData_coleta(Date data_coleta) {
        this.data_coleta = data_coleta;
    }

    public Date getHora_coleta() {
        return hora_coleta;
    }

    public void setHora_coleta(Date hora_coleta) {
        this.hora_coleta = hora_coleta;
    }

    public Date getTs_sincronismo() {
        return ts_sincronismo;
    }

    public void setTs_sincronismo(Date ts_sincronismo) {
        this.ts_sincronismo = ts_sincronismo;
    }

    public String getProduto() {
        return produto;
    }

    public void setProduto(String produto) {
        this.produto = produto;
    }

    public String getAtividade() {
        return atividade;
    }

    public void setAtividade(String atividade) {
        this.atividade = atividade;
    }

    public String getStatus_amostra() {
        return status_amostra;
    }

    public void setStatus_amostra(String status_amostra) {
        this.status_amostra = status_amostra;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.idAmostra);
        hash = 59 * hash + Objects.hashCode(this.amostrador);
        hash = 59 * hash + Objects.hashCode(this.loja);
        hash = 59 * hash + Objects.hashCode(this.unidade);
        hash = 59 * hash + Objects.hashCode(this.data_coleta);
        hash = 59 * hash + Objects.hashCode(this.hora_coleta);
        hash = 59 * hash + Objects.hashCode(this.ts_sincronismo);
        hash = 59 * hash + Objects.hashCode(this.produto);
        hash = 59 * hash + Objects.hashCode(this.atividade);
        hash = 59 * hash + Objects.hashCode(this.status_amostra);
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
        final ColetaAmostra other = (ColetaAmostra) obj;
        if (!Objects.equals(this.amostrador, other.amostrador)) {
            return false;
        }
        if (!Objects.equals(this.loja, other.loja)) {
            return false;
        }
        if (!Objects.equals(this.unidade, other.unidade)) {
            return false;
        }
        if (!Objects.equals(this.produto, other.produto)) {
            return false;
        }
        if (!Objects.equals(this.atividade, other.atividade)) {
            return false;
        }
        if (!Objects.equals(this.status_amostra, other.status_amostra)) {
            return false;
        }
        if (!Objects.equals(this.idAmostra, other.idAmostra)) {
            return false;
        }
        if (!Objects.equals(this.data_coleta, other.data_coleta)) {
            return false;
        }
        if (!Objects.equals(this.hora_coleta, other.hora_coleta)) {
            return false;
        }
        if (!Objects.equals(this.ts_sincronismo, other.ts_sincronismo)) {
            return false;
        }
        return true;
    }

    
    
}