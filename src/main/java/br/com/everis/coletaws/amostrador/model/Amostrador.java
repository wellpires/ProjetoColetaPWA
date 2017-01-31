package br.com.everis.coletaws.amostrador.model;

import br.com.everis.coletaws.unidade.model.Unidade;
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
@Table(name = "amostradores")
public class Amostrador implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_amostrador")
    private Integer idAmostrador = null;
    
    @Column(name = "amostrador",nullable = false, length = 60)
    private String nomeAmostrador = null;
    
    @OneToMany(mappedBy = "amostradores")
    private List<Unidade> unidades = null;

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

    public List<Unidade> getUnidades() {
        return unidades;
    }

    public void setUnidades(List<Unidade> unidades) {
        this.unidades = unidades;
    }
    
}
