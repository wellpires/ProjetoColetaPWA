/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.everis.coletaws.dao;

import br.com.everis.coletaws.utils.JPAUtil;
import java.lang.reflect.ParameterizedType;
import javax.persistence.EntityManager;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public abstract class JpaDao<K, E> implements Dao<K, E> {

    protected Class<E> entityClass;
//    @PersistenceContext
    protected EntityManager entityManager;

    public JpaDao() {
        this.entityManager = JPAUtil.getEntityManaged();
        ParameterizedType genericSuperclass = (ParameterizedType) getClass().getGenericSuperclass();
        this.entityClass = (Class<E>) genericSuperclass.getActualTypeArguments()[1];
    }

    @Override
    public void persist(E entity) {
        entityManager.persist(entity);
    }

    @Override
    public void remove(E entity) {
        entityManager.remove(entity);
    }

    @Override
    public E findById(K id) {
        return entityManager.find(entityClass, id);
    }
}
