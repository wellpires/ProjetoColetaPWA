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
    private Date dataColeta = null;
    
    @Column(name = "hora_coleta", nullable = false)
    @Temporal(value = TemporalType.TIME)
    private Date horaColeta = null;
    
    @Column(name = "hora_real", nullable = false)
    @Temporal(value = TemporalType.TIME)
    private Date horaReal = null;

    @Column(name = "produto", nullable = false, length = 60)
    private String produto = null;
    
    @Column(name = "atividade", nullable = false, length = 60)
    private String atividade = null;
    
    @Column(name = "status_amostra", nullable = false, length = 60)
    private String statusAmostra = null;

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

    public Date getDataColeta() {
        return dataColeta;
    }

    public void setDataColeta(Date dataColeta) {
        this.dataColeta = dataColeta;
    }

    public Date getHoraColeta() {
        return horaColeta;
    }

    public void setHoraColeta(Date horaColeta) {
        this.horaColeta = horaColeta;
    }

    public Date getHoraReal() {
        return horaReal;
    }

    public void setHoraReal(Date horaReal) {
        this.horaReal = horaReal;
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

    public String getStatusAmostra() {
        return statusAmostra;
    }

    public void setStatusAmostra(String statusAmostra) {
        this.statusAmostra = statusAmostra;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.idAmostra);
        hash = 59 * hash + Objects.hashCode(this.amostrador);
        hash = 59 * hash + Objects.hashCode(this.loja);
        hash = 59 * hash + Objects.hashCode(this.unidade);
        hash = 59 * hash + Objects.hashCode(this.dataColeta);
        hash = 59 * hash + Objects.hashCode(this.horaColeta);
        hash = 59 * hash + Objects.hashCode(this.horaReal);
        hash = 59 * hash + Objects.hashCode(this.produto);
        hash = 59 * hash + Objects.hashCode(this.atividade);
        hash = 59 * hash + Objects.hashCode(this.statusAmostra);
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
        if (!Objects.equals(this.statusAmostra, other.statusAmostra)) {
            return false;
        }
        if (!Objects.equals(this.idAmostra, other.idAmostra)) {
            return false;
        }
        if (!Objects.equals(this.dataColeta, other.dataColeta)) {
            return false;
        }
        if (!Objects.equals(this.horaColeta, other.horaColeta)) {
            return false;
        }
        if (!Objects.equals(this.horaReal, other.horaReal)) {
            return false;
        }
        return true;
    }

    
    
}
