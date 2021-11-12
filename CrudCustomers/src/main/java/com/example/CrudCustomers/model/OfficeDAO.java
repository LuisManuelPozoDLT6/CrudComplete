package com.example.CrudCustomers.model;

import com.example.CrudCustomers.service.ConnectionMysql;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OfficeDAO {

    private Connection con;
    private CallableStatement cstm;
    private ResultSet rs;

    public List<Office> findAll(){
        List<Office> listCustomers = new ArrayList<>();

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM offices ORDER BY officeCode;");
            rs = cstm.executeQuery();

            while(rs.next()){
                Office office = new Office();

                office.setOfficeCode(rs.getString("officeCode"));
                office.setCity(rs.getString("city"));
                office.setPhone(rs.getString("phone"));
                office.setAddressLine1(rs.getString("addressLine1"));
                office.setAddressLine2(rs.getString("addressLine2"));
                office.setState(rs.getString("state"));
                office.setCountry(rs.getString("country"));
                office.setPostalCode(rs.getString("postalCode"));
                office.setTerritory(rs.getString("territory"));

                listCustomers.add(office);
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return listCustomers;
    }

    public Office findByOfficeCode(String officeCode){
        Office office = null;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("SELECT * FROM offices WHERE officeCode = ?;");
            cstm.setString(1, officeCode);
            rs = cstm.executeQuery();

            if(rs.next()){
                office = new Office();

                office.setOfficeCode(rs.getString("officeCode"));
                office.setCity(rs.getString("city"));
                office.setPhone(rs.getString("phone"));
                office.setAddressLine1(rs.getString("addressLine1"));
                office.setAddressLine2(rs.getString("addressLine2"));
                office.setState(rs.getString("state"));
                office.setCountry(rs.getString("country"));
                office.setPostalCode(rs.getString("postalCode"));
                office.setTerritory(rs.getString("territory"));
            }
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return office;
    }

    public boolean save(Office office, boolean isCreate){
        boolean aux = false;

        try{
            con = ConnectionMysql.getConnection();
            if(isCreate){
                cstm = con.prepareCall("INSERT INTO offices(officeCode, city, phone, addressLine1, addressLine2, state, country, postalCode, territory) VALUES (?,?,?,?,?,?,?,?,?)");

                cstm.setString(1, office.getOfficeCode());
                cstm.setString(2, office.getCity());
                cstm.setString(3, office.getPhone());
                cstm.setString(4, office.getAddressLine1());
                cstm.setString(5, office.getAddressLine2());
                cstm.setString(6, office.getState());
                cstm.setString(7, office.getCountry());
                cstm.setString(8, office.getPostalCode());
                cstm.setString(9, office.getTerritory());
            } else {
                cstm = con.prepareCall("UPDATE offices SET city=?,phone=?,addressLine1=?,addressLine2=?,state=?,country=?,postalCode=?,territory=? WHERE officeCode = ?;");

                cstm.setString(1, office.getCity());
                cstm.setString(2, office.getPhone());
                cstm.setString(3, office.getAddressLine1());
                cstm.setString(4, office.getAddressLine2());
                cstm.setString(5, office.getState());
                cstm.setString(6, office.getCountry());
                cstm.setString(7, office.getPostalCode());
                cstm.setString(8, office.getTerritory());
                cstm.setString(9, office.getOfficeCode());
            }
            aux = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return aux;
    }

    public boolean delete(String officeCode){
        boolean aux = false;

        try{
            con = ConnectionMysql.getConnection();
            cstm = con.prepareCall("DELETE FROM offices WHERE officeCode = ? ;");
            cstm.setString(1, officeCode);
            aux = cstm.executeUpdate() == 1;
        }catch(SQLException e){
            System.out.printf("Ha sucedido algún error: %s", e.getMessage());
        }finally{
            ConnectionMysql.closeConnections(con, cstm, rs);
        }
        return aux;
    }
}
