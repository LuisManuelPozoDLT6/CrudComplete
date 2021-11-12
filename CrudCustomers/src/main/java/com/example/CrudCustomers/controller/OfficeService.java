package com.example.CrudCustomers.controller;

import com.example.CrudCustomers.model.Customer;
import com.example.CrudCustomers.model.CustomerDAO;
import com.example.CrudCustomers.model.Office;
import com.example.CrudCustomers.model.OfficeDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.util.List;

@Path("/office")
public class OfficeService {

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Office> getEmployees(){
        return new OfficeDAO().findAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Office getOffice(@PathParam("id") String officeCode){
        return new OfficeDAO().findByOfficeCode(officeCode);
    }

    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Office save(MultivaluedMap<String, String> formParams){
        String officeCode = formParams.get("officeCode").get(0);
        if(new OfficeDAO().save(getParams(officeCode, formParams), true))
            return new OfficeDAO().findByOfficeCode(officeCode);
        return null;
    }

    @POST
    @Path("/save/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public Office save(@PathParam("id") String officeCode, MultivaluedMap<String, String> formParams){
        if(new OfficeDAO().save(getParams(officeCode, formParams), false))
            return new OfficeDAO().findByOfficeCode(officeCode);
        return null;
    }

    @POST
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean deleteOffice(@PathParam("id") String officeCode){
        return new OfficeDAO().delete(officeCode);
    }


    private Office getParams(String officeCode, MultivaluedMap<String, String> formParams){
        String city = formParams.get("city").get(0);
        String phone = formParams.get("phone").get(0);
        String addressLine1 = formParams.get("addressLine1").get(0);
        String addressLine2 = formParams.get("addressLine2").get(0);
        String state = formParams.get("state").get(0);
        String country = formParams.get("country").get(0);
        String postalCode = formParams.get("postalCode").get(0);
        String territory = formParams.get("territory").get(0);

        Office office = new Office(officeCode, city, phone, addressLine1, addressLine2, state, country,postalCode, territory);
        System.out.println(office);
        return office;
    }
}
