package com.example.CrudCustomers.model;

import com.example.CrudCustomers.service.ConnectionMysql;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {

    private Connection con;
    private CallableStatement cstm;
    private ResultSet rs;

    public List<Product> findAll(){
        List<Product> listProducts = new ArrayList<>();

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM products;");
            rs = cstm.executeQuery();

            while(rs.next()){
                Product product = new Product();

                product.setProductCode(rs.getString("productCode"));
                product.setProductName(rs.getString("productName"));
                product.setProductLine(rs.getString("productLine"));
                product.setProductScale(rs.getString("productScale"));
                product.setProductVendor(rs.getString("productVendor"));
                product.setProductDescription(rs.getString("productDescription"));
                product.setQuantityInStock(rs.getInt("quantityInStock"));
                product.setBuyPrice(rs.getDouble("buyPrice"));
                product.setMSRP(rs.getDouble("MSRP"));

                listProducts.add(product);
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return listProducts;
    }

    public Product findProductById(String productCode){
        Product product = null;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM products WHERE productCode = ?;");
            cstm.setString(1, productCode);
            rs = cstm.executeQuery();

            if(rs.next()){
                product = new Product();

                product.setProductCode(rs.getString("productCode"));
                product.setProductName(rs.getString("productName"));
                product.setProductLine(rs.getString("productLine"));
                product.setProductScale(rs.getString("productScale"));
                product.setProductVendor(rs.getString("productVendor"));
                product.setProductDescription(rs.getString("productDescription"));
                product.setQuantityInStock(rs.getInt("quantityInStock"));
                product.setBuyPrice(rs.getDouble("buyPrice"));
                product.setMSRP(rs.getDouble("MSRP"));
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return product;
    }

    public boolean save(Product product, boolean isCreate){
        boolean aux = false;

        try{
            con = ConnectionMysql.getConnection();
            if(isCreate){
                cstm = con.prepareCall("INSERT INTO products(productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP) VALUES (?,?,?,?,?,?,?,?,?);");

                cstm.setString(1, product.getProductCode());
                cstm.setString(2, product.getProductName());
                cstm.setString(3, product.getProductLine());
                cstm.setString(4, product.getProductScale());
                cstm.setString(5, product.getProductVendor());
                cstm.setString(6, product.getProductDescription());
                cstm.setInt(7, product.getQuantityInStock());
                cstm.setDouble(8, product.getBuyPrice());
                cstm.setDouble(9, product.getMSRP());
            } else {
                cstm = con.prepareCall("UPDATE products SET productName=?,productLine=?,productScale=?,productVendor=?,productDescription=?,quantityInStock=?,buyPrice=?,MSRP=? WHERE productCode = ?;");

                cstm.setString(1, product.getProductName());
                cstm.setString(2, product.getProductLine());
                cstm.setString(3, product.getProductScale());
                cstm.setString(4, product.getProductVendor());
                cstm.setString(5, product.getProductDescription());
                cstm.setInt(6, product.getQuantityInStock());
                cstm.setDouble(7, product.getBuyPrice());
                cstm.setDouble(8, product.getMSRP());
                cstm.setString(9, product.getProductCode());
            }

            aux = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return aux;
    }

    public boolean delete(String productCode){
        boolean aux = false;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("DELETE FROM products WHERE productCode = ?;");
            cstm.setString(1, productCode);
            aux = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return aux;
    }
}
