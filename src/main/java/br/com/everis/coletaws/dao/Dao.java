/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.everis.coletaws.dao;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public interface Dao<K, E> {

    void persist(E entity);

    void remove(E entity);

    E findById(K id);
}
