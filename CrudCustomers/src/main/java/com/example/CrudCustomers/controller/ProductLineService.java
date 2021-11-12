package com.example.CrudCustomers.controller;

import com.example.CrudCustomers.model.ProductLine;
import com.example.CrudCustomers.model.ProductLineDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import java.util.List;

@Path("/productLine")
public class ProductLineService {

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ProductLine> getProductLine(){
        return new ProductLineDAO().findAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ProductLine getProdcutLine(@PathParam("id") String productLine){ return new ProductLineDAO().findProductLineById(productLine);
    }

    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public ProductLine save(MultivaluedMap<String, String> formParams){
        String productLine = formParams.get("productLine").get(0);
        if(new ProductLineDAO().save(getParams(productLine, formParams), true))
            return new ProductLineDAO().findProductLineById(productLine);
        return null;
    }

    @POST
    @Path("/save/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/x-www-form-urlencoded")
    public ProductLine save(@PathParam("id") String productLine, MultivaluedMap<String, String> formParams){
        if(new ProductLineDAO().save(getParams(productLine, formParams), false))
            return new ProductLineDAO().findProductLineById(productLine);
        return null;
    }


    @POST
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public boolean deleteProductLine(@PathParam("id") String productLine){
        return new ProductLineDAO().delete(productLine);
    }

    private ProductLine getParams(String productLine, MultivaluedMap<String, String> formParams){
        String textDescription = formParams.get("textDescription").get(0);
        String htmlDescription = formParams.get("htmlDescription").get(0);

        ProductLine pl = new ProductLine(productLine, textDescription, htmlDescription, 1);
        System.out.println(pl);
        return pl;
    }

}
