package br.com.everis.coletaws.utils;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUtil {

    public static final long serialVersionUID = 1L;

    private static EntityManagerFactory factory;
//    private static final SessionFactory sessionFactory;

    static {
        try {
            System.out.println("======================== INICIALIZANDO ColetaPU ========================");
            factory = Persistence.createEntityManagerFactory("ColetaPU");
//            Configuration configuration = new Configuration();
//            configuration.configure();
//            ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();
//            sessionFactory = configuration.buildSessionFactory(serviceRegistry);
            System.out.println("============================================================================");
        } catch (Throwable t) {
            throw t;
        }
    }

    public static EntityManager getEntityManaged() {
        return factory.createEntityManager();

    }

//    public static SessionFactory getSessionFactory() {
//        return sessionFactory;
//    }

    public static void close() {
        factory.close();
    }
}
