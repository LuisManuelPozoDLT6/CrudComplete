package com.example.CrudCustomers.model;

import com.example.CrudCustomers.service.ConnectionMysql;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class ProductLineDAO {

    private Connection con;
    private CallableStatement cstm;
    private ResultSet rs;

    public List<ProductLine> findAll(){
        List<ProductLine> listProductLines = new ArrayList<>();

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM productlines;");
            rs = cstm.executeQuery();

            while(rs.next()){
                ProductLine pl = new ProductLine();

                pl.setProductLine(rs.getString("productLine"));
                pl.setTextDescription(rs.getString("textDescription"));
                pl.setHtmlDescription(rs.getString("htmlDescription"));
                pl.setImage(rs.getInt("image"));

                listProductLines.add(pl);
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return listProductLines;
    }

    public ProductLine findProductLineById(String productLine){
        ProductLine pl = null;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM productlines WHERE productLine = ?;");
            cstm.setString(1, productLine);
            rs = cstm.executeQuery();

            if(rs.next()){
                pl = new ProductLine();

                pl.setProductLine(rs.getString("productLine"));
                pl.setTextDescription(rs.getString("textDescription"));
                pl.setHtmlDescription(rs.getString("htmlDescription"));
                pl.setImage(rs.getInt("image"));
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return pl;
    }

    public boolean save(ProductLine pl, boolean isCreate){
        boolean aux = false;

        try{
            con = ConnectionMysql.getConnection();
            if(isCreate){
                cstm = con.prepareCall("INSERT INTO productlines(productLine, textDescription, htmlDescription, image) VALUES (?,?,?,1)");

                cstm.setString(1, pl.getProductLine());
                cstm.setString(2, pl.getTextDescription());
                cstm.setString(3, pl.getHtmlDescription());

            } else {
                cstm = con.prepareCall("UPDATE productlines SET productLine= ?,textDescription= ?,htmlDescription= ? WHERE productLine = ?;");

                cstm.setString(1, pl.getProductLine());
                cstm.setString(2, pl.getTextDescription());
                cstm.setString(3, pl.getHtmlDescription());
                cstm.setString(4, pl.getProductLine());
            }
            aux = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return aux;
    }

    public boolean delete(String productLine){
        boolean aux = false;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("DELETE FROM productlines WHERE productLine = ? ;");
            cstm.setString(1, productLine);
            aux = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return aux;
    }
}
