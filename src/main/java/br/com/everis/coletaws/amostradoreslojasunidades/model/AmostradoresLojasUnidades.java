package br.com.everis.coletaws.amostradoreslojasunidades.model;

import java.io.Serializable;
import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

/**
 *
 * @author Wellington Gonçalves Pires
 */
@Entity
@Table(name = "amostradores_lojas_unidades")
@AssociationOverrides({
    @AssociationOverride(name = "amostradoresLojasUnidadesPK.amostrador", joinColumns = @JoinColumn(name ="id_amostrador")),
    @AssociationOverride(name = "amostradoresLojasUnidadesPK.loja", joinColumns = @JoinColumn(name ="id_loja")),
    @AssociationOverride(name = "amostradoresLojasUnidadesPK.unidade", joinColumns = @JoinColumn(name ="id_unidade"))
})
public class AmostradoresLojasUnidades implements Serializable{
    
    private static final long serialVersionUID = 1L;
    
    private AmostradoresLojasUnidadesPK amostradoresLojasUnidadesPK = new AmostradoresLojasUnidadesPK();

    @EmbeddedId
    public AmostradoresLojasUnidadesPK getAmostradoresLojasUnidadesPK() {
        return amostradoresLojasUnidadesPK;
    }

    public void setAmostradoresLojasUnidadesPK(AmostradoresLojasUnidadesPK amostradoresLojasUnidadesPK) {
        this.amostradoresLojasUnidadesPK = amostradoresLojasUnidadesPK;
    }
    
    
    
}
