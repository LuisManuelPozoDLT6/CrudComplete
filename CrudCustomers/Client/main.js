const url = "http://localhost:8080/CrudCustomers_war_exploded";

const getCustomers = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/customer"
    }).done(res => {
        let listCustomers = res;
        let infoCus = "";

        for (let i = 0; i < listCustomers.length; i++) {
            infoCus += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${res[i].customerName}</td>
                    <td>${res[i].contactFirstName} ${res[i].contactLastName}</td>
                    <td>${res[i].phone}</td>
                    <td>${res[i].addressLine1}, ${res[i].postalCode}, ${res[i].state}, ${res[i].country}</td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].customerNumber}">
                        <button title="Eliminar"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" onclick="getCustomerById(${res[i].customerNumber})"><i class="fas fa-user-times" ></i></button> 
                    </td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].customerNumber}">
                        <button class="btn btn-primary" title="Modificar" data-bs-toggle="modal" data-bs-target="#update" onclick="getCustomerById(${res[i].customerNumber})"><i class="fas fa-user-edit"></i></button>
                    </td>
                </tr>
            `;
        }
        $("#table").html(infoCus);

    });
};

const getCustomerById = (id) => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/customer/" + id
    }).done(res => {
        let listCustomers = res;
        let infoCus = `  
                <div class="col-6">
                    <label for="">Número de cliente</label>
                    <input class="form-control" type="number" value="${res.customerNumber}" required name="Number2" id="Number2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Nombre del cliente</label>
                    <input class="form-control" type="text" value="${res.customerName}" id="Name2" name="Name">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Nombre del contacto</label>
                    <input class="form-control" type="text" value="${res.contactFirstName}" id="ContactName2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Apellido del contacto</label>
                    <input class="form-control" type="text" value="${res.contactLastName}" id="ContactLastName2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Telefono del cliente</label>
                    <input class="form-control" type="text" value="${res.phone}" id="Phone2" name="Phone2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Limite de crédito</label>
                    <input class="form-control" type="number" value="${res.creditLimit}" id="Limit2" name="Limit">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Dirección 1</label>
                    <input class="form-control" type="text" value="${res.addressLine1}" id="Address1a" name="Address1">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Dirección 2</label>
                    <input class="form-control" type="text" value="${res.addressLine2}" id="Address2b" name="Address2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Ciudad</label>
                    <input class="form-control" type="text" value="${res.city}" id="City2" name="City2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Estado</label>
                    <input class="form-control" type="text" value="${res.state}" id="State2" name="State2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Codigo postal</label>
                    <input class="form-control" type="number" value="${res.postalCode}" id="Postal2" name="Postal2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">País</label>
                    <input class="form-control" type="text" value="${res.country}" id="Country2" name="Country2">
                    <br>
                </div>
                    <input class="form-control" type="hidden" value="${res.salesRepEmployeeNumber}" id="employees2" name="employees2">`;
        msgDelete = `<h6>Desea eliminar a ${res.customerName} ?</h6>`;

        $("#modalUpdate").html(infoCus);
        $("#modalDelete").html(msgDelete);

    });
};

const getEmployees = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/employee"
    }).done(res => {
        let listEmployees = res;
        let employees = $("#employees");
        employees.append(`<option value="0">Nombre de empleado</option>`);

        for (let i = 0; i < listEmployees.length; i++) {
            employees.append(`<option value="${listEmployees[i].employeeNumber}">${listEmployees[i].firstName} ${listEmployees[i].lastName}</option>`)
        }
    });
};


const save = () => {
    console.log("THIS");
    let form = document.getElementById("formSave");
    console.log(form);
    let customer = new Object();
    customer.customerNumber = document.getElementById("Number").value;
    customer.customerName = document.getElementById("Name").value;
    customer.contactFirstName = document.getElementById("ContactName").value;
    customer.contactLastName = document.getElementById("ContactLastName").value;
    customer.phone = document.getElementById("Phone").value;
    customer.creditLimit = document.getElementById("Limit").value;
    customer.addressLine1 = document.getElementById("Address1").value;
    customer.addressLine2 = document.getElementById("Address2").value;
    customer.city = document.getElementById("City").value;
    customer.state = document.getElementById("State").value;
    customer.postalCode = document.getElementById("Postal").value;
    customer.country = document.getElementById("Country").value;
    customer.salesRepEmployeeNumber = document.getElementById("employees").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/customer/save",
        data: customer
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha registrado al cliente exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo registrar al cliente<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getCustomers();
    });
    window.alert("Hello world!");
}

const update = () => {
    console.log("THIS");
    let form = document.getElementById("formUpdate");
    console.log(form);
    let customer = new Object();
    let id = document.getElementById("Number2").value;
    customer.customerNumber = document.getElementById("Number2").value;
    customer.customerName = document.getElementById("Name2").value;
    customer.contactFirstName = document.getElementById("ContactName2").value;
    customer.contactLastName = document.getElementById("ContactLastName2").value;
    customer.phone = document.getElementById("Phone2").value;
    customer.creditLimit = document.getElementById("Limit2").value;
    customer.addressLine1 = document.getElementById("Address1a").value;
    customer.addressLine2 = document.getElementById("Address2b").value;
    customer.city = document.getElementById("City2").value;
    customer.state = document.getElementById("State2").value;
    customer.postalCode = document.getElementById("Postal2").value;
    customer.country = document.getElementById("Country2").value;
    customer.salesRepEmployeeNumber = document.getElementById("employees2").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/customer/save/" + id,
        data: customer
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha modificado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo modificar al cliente<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getCustomers();

    });
}

const deleteCustomers = () => {
    console.log("THIS");
    let id = document.getElementById("Number2").value;
    let form = document.getElementById("formDelete");
    console.log(form);

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/customer/delete/" + id,
    }).done(res => {
        console.log(res);

        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha eliminado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo eliminar el cliente<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getCustomers();
    });

}

// OFICINAS
const getOffices = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/office"
    }).done(res => {
        let listOffices = res;
        let info = "";

        for (let i = 0; i < listOffices.length; i++) {
            info += `
                <tr>
                    <td>${res[i].officeCode}</td>
                    <td>${res[i].phone}</td>
                    <td>${res[i].addressLine1}, ${res[i].addressLine2}, ${res[i].postalCode}, ${res[i].city} ${res[i].state}, ${res[i].country}</td>
                    <td>${res[i].territory}</td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].officeCode}">
                        <button title="Eliminar"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteOffice" onclick="getOfficeById(${res[i].officeCode})"><i class="fas fa-user-times" ></i></button> 
                    </td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].officeCode}">
                        <button class="btn btn-primary" title="Modificar" data-bs-toggle="modal" data-bs-target="#updateOficce" onclick="getOfficeById(${res[i].officeCode})"><i class="fas fa-user-edit"></i></button>
                    </td>
                </tr>
            `;
        }
        $("#tableOffices").html(info);
    });
};

const saveOffice = () => {
    console.log("THIS");
    let form = document.getElementById("formSaveOffice");
    console.log(form);
    let office = new Object();
    office.officeCode = document.getElementById("Code").value;
    office.city = document.getElementById("City").value;
    office.phone = document.getElementById("Phone").value;
    office.addressLine1 = document.getElementById("Address1").value;
    office.addressLine2 = document.getElementById("Address2").value;
    office.state = document.getElementById("State").value;
    office.country = document.getElementById("Country").value;
    office.postalCode = document.getElementById("Postal").value;
    office.territory = document.getElementById("Territory").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/office/save",
        data: office
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha registrado al cliente exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo registrar al cliente<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getOffices();
    });
}

const getOfficeById = (id) => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/office/" + id
    }).done(res => {
        let listOffices = res;
        console.log("hola");
        let infoCode = `  
                <div class="col-6">
                    <label for="">Código de oficina</label>
                    <input class="form-control" type="number" value="${res.officeCode}" required name="Code2" id="Code2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Ciudad</label>
                    <input class="form-control" type="text" value="${res.city}" id="City2" name="City2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Telefono del cliente</label>
                    <input class="form-control" type="text" value="${res.phone}" id="Phone2" name="Phone2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Dirección 1</label>
                    <input class="form-control" type="text" value="${res.addressLine1}" id="Address1a" name="Address1">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Dirección 2</label>
                    <input class="form-control" type="text" value="${res.addressLine2}" id="Address2b" name="Address2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Estado</label>
                    <input class="form-control" type="text" value="${res.state}" id="State2" name="State2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">País</label>
                    <input class="form-control" type="text" value="${res.country}" id="Country2" name="Country2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Codigo postal</label>
                    <input class="form-control" type="number" value="${res.postalCode}" id="Postal2" name="Postal2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Territorio</label>
                    <input class="form-control" type="text" value="${res.territory}" id="Territory2" name="Territory">
                    <br>
                </div>`;
        let msgDelete = `<h3>Desea eliminar la oficina con código ${res.officeCode}?</h3>`;

        $("#modalUpdateOffice").html(infoCode);
        $("#modalDeleteOffice").html(msgDelete);
    });
};

const updateOffice = () => {
    console.log("THIS");
    let form = document.getElementById("formUpdateOffice");
    console.log(form);
    let office = new Object();
    let id = document.getElementById("Code2").value;
    office.officeCode = document.getElementById("Code2").value;
    office.city = document.getElementById("City2").value;
    office.phone = document.getElementById("Phone2").value;
    office.addressLine1 = document.getElementById("Address1a").value;
    office.addressLine2 = document.getElementById("Address2b").value;
    office.state = document.getElementById("State2").value;
    office.country = document.getElementById("Country2").value;
    office.postalCode = document.getElementById("Postal2").value;
    office.territory = document.getElementById("Territory2").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/office/save/" + id,
        data: office
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha modificado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo modificar la oficina<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getOffices();

    });
}

const deleteOffice = () => {
    console.log("THIS");
    let id = document.getElementById("Code2").value;
    let form = document.getElementById("formDeleteOffice");
    console.log(form);

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/office/delete/" + id,
    }).done(res => {
        console.log(res);

        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha eliminado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo eliminar la oficina<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getOffices();
    });

}

// LINEA DE PRODUCTOS
const getProductLine = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/productLine"
    }).done(res => {
        let listPl = res;
        let info = "";

        for (let i = 0; i < listPl.length; i++) {
            info += `
                <tr>
                    <td>${res[i].productLine}</td>
                    <td>${res[i].textDescription}</td>
                    <td class="text-center ">
                        <input type="hidden" value="${res[i].productLine}">
                        <button title="Eliminar"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProductL" onclick="getProductLineById('${res[i].productLine}')"><i class="fas fa-user-times" ></i></button> 
                    </td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].productLine}">
                        <button class="btn btn-primary" title="Modificar" data-bs-toggle="modal" data-bs-target="#updateProductL" onclick="getProductLineById('${res[i].productLine}')"><i class="fas fa-user-edit"></i></button>
                    </td>
                </tr>
            `;
        }
        $("#tableProductLine").html(info);
    });
};

const saveProductLine = () => {
    console.log("THIS");
    let form = document.getElementById("formSaveProductLine");
    console.log(form);
    let productLine = new Object();
    productLine.productLine = document.getElementById("productLine").value;
    productLine.textDescription = document.getElementById("description").value;
    productLine.htmlDescription = document.getElementById("htmlDescription").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/productLine/save",
        data: productLine
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha registrado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo registrar<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getProductLine();
    });
}

const getProductLineById = (id) => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/productLine/" + id
    }).done(res => {
        let listPl = res;
        let infoCode = `  
                <div class="col-6">
                    <label for="">Linea del producto</label>
                    <input class="form-control" type="text" readonly value="${res.productLine}" placeholder="Linea del producto" required
                        name="productLine2" id="productLine2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">HTML descripción</label>
                    <input class="form-control" type="text" value="${res.htmlDescription}" placeholder="HTML descripción" required
                        name="htmlDescription2" id="htmlDescription2">
                    <br>
                </div>
                <div class="col-12">
                    <label for="">Descripción</label>
                    <textarea name="description2" id="description2" class="form-control" cols="30" rows="10" type="text" >${res.textDescription}</textarea>
                    <br>
                </div>
                `;

        let msgDelete = `<h3>Desea eliminar a ${res.productLine}?</h3>`;

        $("#modalUpdateProductL").html(infoCode);
        $("#modalDeleteProductLine").html(msgDelete);
    });
};

const updateProductLine = () => {
    console.log("THIS");
    let form = document.getElementById("formUpdateProductLine");
    console.log(form);
    let productLine = new Object();
    let id = document.getElementById("productLine2").value;
    productLine.productLine = document.getElementById("productLine2").value;
    productLine.textDescription = document.getElementById("description2").value;
    productLine.htmlDescription = document.getElementById("htmlDescription2").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/productLine/save/" + id,
        data: productLine
    }).done(res => {
        console.log(res);

        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha modificado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo modificar<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getProductLine();

    });
}

const deleteProductLine = () => {
    console.log("THIS");
    let id = document.getElementById("productLine2").value;
    let form = document.getElementById("formDeleteProductLine");
    console.log(form);

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/productLine/delete/" + id,
    }).done(res => {
        console.log(res);

        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha eliminado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo eliminar la oficina<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getProductLine();
    });

}

// PRODUCTOS
const getProduct = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/product"
    }).done(res => {
        console.log(res);
        let listProduct = res;
        let info = "";

        for (let i = 0; i < listProduct.length; i++) {
            info += `
                <tr>
                    <td>${res[i].productCode}</td>
                    <td>${res[i].productName}</td>
                    <td>${res[i].productLine}</td>
                    <td>${res[i].productScale}</td>
                    <td>${res[i].productVendor}</td>
                    <td >${res[i].productDescription}</td>
                    <td>${res[i].quantityInStock}</td>
                    <td>${res[i].buyPrice}</td>
                    <td>${res[i].MSRP}</td>
                    <td class="text-center ">
                        <input type="hidden" value="${res[i].productCode}">
                        <button title="Eliminar"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProduct" onclick="getProductById('${res[i].productCode}')"><i class="fas fa-user-times" ></i></button> 
                    </td>
                    <td class="text-center">
                        <input type="hidden" value="${res[i].productCode}">
                        <button class="btn btn-primary" title="Modificar" data-bs-toggle="modal" data-bs-target="#updateProduct" onclick="getProductById('${res[i].productCode}')"><i class="fas fa-user-edit"></i></button>
                    </td>
                </tr>
            `;
        }
        $("#tableProduct").html(info);
    });
};

const saveProduct = () => {
    console.log("THIS");
    let form = document.getElementById("formSaveProduct");
    console.log(form);
    let product = new Object();
    product.productCode = document.getElementById("code").value;
    product.productName = document.getElementById("name").value;
    product.productLine = document.getElementById("productLine").value;
    product.productScale = document.getElementById("scale").value;
    product.productVendor = document.getElementById("vendor").value;
    product.productDescription = document.getElementById("description").value;
    product.quantityInStock = document.getElementById("inStock").value;
    product.buyPrice = document.getElementById("buyPrice").value;
    product.MSRP = document.getElementById("MSRP").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/product/save",
        data: product
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha registrado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo registrar<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getProduct();
    });
}

const getLines = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/productLine"
    }).done(res => {
        let listProductLine = res;
        let productLine = $("#productLine");

        productLine.append(`<option value="0">Linea del producto</option>`);

        for (let i = 0; i < listProductLine.length; i++) {
            productLine.append(`<option value="${listProductLine[i].productLine}">${listProductLine[i].productLine}</option>`)
        }
    });
};

const getProductById = (id) => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + "/product/" + id
    }).done(res => {
        let listProduct = res;
        let infoCode = `  
                <div class="col-6">
                    <label for="">Código</label>
                    <input class="form-control" type="text" readonly value="${res.productCode}" required
                        name="code2" id="code2">
                    <br>
                </div>
                <div class="col-6">
                <label for="">Nombre</label>
                    <input class="form-control" type="text" value="${res.productName}" required id="name2" 
                        name="name2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Escala</label>
                    <input class="form-control" type="text" value="${res.productScale}" required
                         id="scale2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Vendedor</label>
                    <input class="form-control" type="text" value="${res.productVendor}" required
                         id="vendor2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Cantidad en inventario</label>
                    <input class="form-control" type="number" value="${res.quantityInStock}" required
                        id="inStock2" name="inStock2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">Precio de compra</label>
                    <input class="form-control" type="number" value="${res.buyPrice}" id="buyPrice2" required
                        name="buyPrice2">
                    <br>
                </div>
                <div class="col-6">
                    <label for="">MSRP</label>
                    <input class="form-control" type="number" step="any" value="${res.MSRP}" id="MSRP2" required
                        name="MSRP2">
                    <br>
                </div>
                <input class="form-control" type="hidden" value="${res.productLine}" id="productLine2" name="employees2">
                <div class="col-12">
                    <label for="">Descripción</label>
                    <textarea  name="description" id="description2" cols="5" rows="5" class="form-control" type="text" required>${res.productDescription}</textarea>
                    <br>
                </div>
                `;

        let msgDelete = `<h3>Desea eliminar a ${res.productName}?</h3>`;

        $("#modalUpdateProduct").html(infoCode);
        $("#modalDeleteProduct").html(msgDelete);
    });
};

const updateProduct = () => {
    console.log("THIS");
    let form = document.getElementById("formUpdateProduct");
    console.log(form);
    let product = new Object();
    let id = document.getElementById("code2").value;
    product.productCode = document.getElementById("code2").value;
    product.productName = document.getElementById("name2").value;
    product.productLine = document.getElementById("productLine2").value;
    product.productScale = document.getElementById("scale2").value;
    product.productVendor = document.getElementById("vendor2").value;
    product.productDescription = document.getElementById("description2").value;
    product.quantityInStock = document.getElementById("inStock2").value;
    product.buyPrice = document.getElementById("buyPrice2").value;
    product.MSRP = document.getElementById("MSRP2").value;

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/product/save/" + id,
        data: product
    }).done(res => {
        console.log(res);
        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha modificado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);

        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo modificar <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getProduct();

    });
}

const deleteProduct = () => {
    console.log("THIS");
    let id = document.getElementById("code2").value;
    let form = document.getElementById("formDeleteProduct");
    console.log(form);

    $.ajax({
        type: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: url + "/product/delete/" + id,
    }).done(res => {
        console.log(res);

        if (res) {
            $("#succes").html(`<div class="alert alert-dismissible alert-success" role="alert">Se ha eliminado exitosamente!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        } else {
            $("#succes").html(`<div class="alert alert-dismissible alert-danger" role="alert">Error!: No se pudo eliminar la oficina<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`);
        }
        getProduct();
    });

}


getProduct();
getCustomers();
getEmployees();
getOffices();
getProductLine();
getLines();
