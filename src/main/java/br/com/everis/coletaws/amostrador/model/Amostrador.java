package br.com.everis.coletaws.amostrador.model;

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
@Table(name = "amostradores")
public class Amostrador implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_amostrador")
    private Integer idAmostrador = null;
    
    @Column(name = "amostrador",nullable = false, length = 60)
    private String nomeAmostrador = null;
    
    public Integer getIdAmostrador() {
        return idAmostrador;
    }

    public void setIdAmostrador(Integer idAmostrador) {
        this.idAmostrador = idAmostrador;
    }

    public String getNomeAmostrador() {
        return nomeAmostrador;
    }

    public void setNomeAmostrador(String nomeAmostrador) {
        this.nomeAmostrador = nomeAmostrador;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.idAmostrador);
        hash = 97 * hash + Objects.hashCode(this.nomeAmostrador);
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
        final Amostrador other = (Amostrador) obj;
        if (!Objects.equals(this.nomeAmostrador, other.nomeAmostrador)) {
            return false;
        }
        if (!Objects.equals(this.idAmostrador, other.idAmostrador)) {
            return false;
        }
        return true;
    }
    
    
    
}
