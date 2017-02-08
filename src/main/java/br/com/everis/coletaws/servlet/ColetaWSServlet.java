package br.com.everis.coletaws.servlet;

import br.com.everis.coletaws.utils.JPAUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

/**
 *
 * @author Wellington Gonçalves Pires
 */
public class ColetaWSServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    @Override
    public void init() throws ServletException{
        JPAUtil.getEntityManaged();
        
    }
    
}
