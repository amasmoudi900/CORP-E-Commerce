// customerSignup function to add user into local storage : users with role='user'
function customerSignup() {
    // insert user into LS : users
    // unique ID
    // Get inputs values
    var firstName = document.getElementById('fName').value;
    var lastName = document.getElementById('lName').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;
    var confirmPwd = document.getElementById('confirmPwd').value;
    var tel = document.getElementById('tel').value;

    var userId = JSON.parse(localStorage.getItem('userIdKey') || '1');
    // create user object
    var user = {
        id: userId,
        fName: firstName,
        lName: lastName,
        email: email,
        pwd: pwd,
        confirmPwd: confirmPwd,
        tel: tel,
        role: 'user'
    };
    // Get all users from LS by key = users
    var usersTab = getObjectsFromLS('users');
    // Insert user object into users array
    usersTab.push(user);
    // set users array into LS
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('userIdKey', userId + 1);
    location.replace('login.html');
}
// login function that allows to connect by email and pwd
function login() {
    var email = document.getElementById('loginEmail').value;
    var pwd = document.getElementById('loginPwd').value;
    var findedUser = searchUser(email, pwd);
    console.log('Finded User', findedUser);
    // user is correct
    if (findedUser) {
        if (findedUser.role == 'admin') {
            //save user id into LS
            localStorage.setItem('connectedUserId', findedUser.id);
            // Go To index.html
            location.replace('index.html');
        } else {
            //save user id into LS
            localStorage.setItem('connectedUserId', findedUser.id);
            // Go To index.html
            location.replace('shop.html');
        }

    } else {
        document.getElementById('loginMsgError').innerHTML = 'Please check Email/pwd';
        document.getElementById('loginMsgError').style.color = 'red';
    }
}
// search user by email and pwd from users (getted from Local storage)
function searchUser(emailParam, pwdParam) {
    var users = getObjectsFromLS('users');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailParam && users[i].pwd == pwdParam) {
            findedUser = users[i];
            break;
        }
    }
    return findedUser;
}
// adminSignup function to add Admin into local storage : users with role='admin'
function adminSignup() {
    // insert user into LS : users
    // unique ID
    // Get inputs values
    var firstName = document.getElementById('adminFirstName').value;
    var lastName = document.getElementById('adminLastName').value;
    var email = document.getElementById('adminEmail').value;
    var pwd = document.getElementById('adminPwd').value;
    var confirmPwd = document.getElementById('adminConfirmPwd').value;
    var tel = document.getElementById('adminTel').value;
    var fax = document.getElementById('fax').value;
    var address = document.getElementById('adminAddress').value;
    var companyName = document.getElementById('companyName').value;
    var companyId = document.getElementById('companyId').value;

    var userId = JSON.parse(localStorage.getItem('userIdKey') || '1');
    // create Admin object
    var user = {
        id: userId,
        fName: firstName,
        lName: lastName,
        email: email,
        pwd: pwd,
        confirmPwd: confirmPwd,
        tel: tel,
        fax: fax,
        address: address,
        companyName: companyName,
        companyId: companyId,
        role: 'admin'
    };
    // Get all users from LS by key = users
    var usersTab = getObjectsFromLS('users');
    // Insert user object into users array
    usersTab.push(user);
    // set users array into LS
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('userIdKey', userId + 1);
    location.replace('login.html');

}
// addCategory function that allows to save category into Local Storage : categories
function addCategory() {
    var name = document.getElementById('categoryName').value;
    var connectedUserId = getConnectedUser();
    var categoryId = JSON.parse(localStorage.getItem('categoryIdKey') || '1');
    var category = {
        id: categoryId,
        name: name,
        userId: connectedUserId
    };
    var categories = getObjectsFromLS('categories');
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('categoryIdKey', categoryId + 1);
}
// addProduct function that allows to save Product into Local Storage : products
function addProduct() {
    var name = document.getElementById('productName').value;
    var price = document.getElementById('productPrice').value;
    var stock = document.getElementById('productStock').value;
    var category = document.getElementById('productCategory').value;
    var connectedUserId = getConnectedUser();
    var productId = JSON.parse(localStorage.getItem('productIdKey') || '1');
    var product = {
        id: productId,
        name: name,
        price: price,
        stock: stock,
        category: category,
        userId: connectedUserId,
        isConfirmed: false
    };
    var productsTab = getObjectsFromLS('products');
    productsTab.push(product);
    localStorage.setItem('products', JSON.stringify(productsTab));
    localStorage.setItem('productIdKey', productId + 1);
}
// generate categories options
function generateOptions() {
    var categories = getObjectsFromLS('categories');
    var connectedUserId = getConnectedUser();
    var categoriesSelect = '';
    for (let i = 0; i < categories.length; i++) {
        if (connectedUserId == categories[i].userId) {
            categoriesSelect = categoriesSelect + `
            <option value="${categories[i].name}">${categories[i].name}</option>`
        }
    }
    document.getElementById('productCategory').innerHTML = categoriesSelect;
}
// function getObjectsFromLS that return all objects from LS by params = key
function getObjectsFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
// function getConnectedUser that return connected user id from LS
function getConnectedUser() {
    return localStorage.getItem('connectedUserId');
}
// displayUserProducts function that allows to display all connected user products
function displayUserProducts() {
    var products = getObjectsFromLS('products');
    var connectedUserId = getConnectedUser();
    var myProducts = getUserProducts(connectedUserId, products);
    var productsDiv = ``;
    for (let i = 0; i < myProducts.length; i++) {
        productsDiv = productsDiv + `
            <div class="col-lg-3 col-md-6">
                            <div class="single-product">
                                <img class="img-fluid" src="img/product/p1.jpg" alt="">
                                <div class="product-details">
                                    <h6> ${myProducts[i].name}</h6>
                                    <div class="price">
                                        <h6>$${myProducts[i].price}</h6>
                                        <h6 class="l-through">$${myProducts[i].price}</h6>
                                    </div>
                                    <h6> ${myProducts[i].category}</h6>
                                    <h6> ${myProducts[i].stock}</h6>
                                    <div class="prd-bottom">

                                        <div class="social-info">
                                            <span class="ti-bag"></span>
                                            <button class="btn hover-text" onclick="goToDisplay(${myProducts[i].id})" style="background-color:#fff;">Display</button>
                                        </div>
                                        <div class="social-info">
                                            <span class="ti-bag"></span>
                                            <button class="btn hover-text" onclick="deleteObject(${getObjectPositionById(myProducts[i].id, products)}, 'products')" style="background-color:#fff;">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`

    }
    document.getElementById('products').innerHTML = productsDiv;

}
// function getUserProducts that returns user products By id (2 params: UserId, products array)
function getUserProducts(userId, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (userId == productsTab[i].userId && productsTab[i].isConfirmed == true) {
            myProducts.push(productsTab[i]);
        }
    }
    return myProducts;
}
// function goToDisplay product that change location and save id into LS
function goToDisplay(idProduct) {
    localStorage.setItem('selectedProductId', idProduct);
    location.replace('single-product.html');
}
// function searchProductById that returns object (product) from local storage
function searchProductById(id) {
    var products = getObjectsFromLS('products');
    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            findedProduct = products[i];
            break;
        }
    }
    return findedProduct;
}
// function displayEditForm that display edit form after btn click
function displayEditForm() {
    var idProduct = localStorage.getItem('selectedProductId');
    var findedProduct = searchProductById(idProduct);
    var editForm = `
                <div class="row">
                    <div class="col-lg-12">
                        <div class="login_form_inner" style="margin-top:50px">
                            <h3>Edit product</h3>
                            <div class="row login_form" >
                                <label for="">Price</label>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" id="newPriceId" value=${findedProduct.price}>
                                </div>
                                <label for="">Stock</label>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" id="newStockId" value=${findedProduct.stock}>
                                </div>
                                <div class="col-md-12 form-group">
                                    <button type="submit" value="submit" class="primary-btn" onclick="validateEdit()">Validate Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    document.getElementById('editFormDiv').innerHTML = editForm;
}
//function validateEdit: update product price and stock by new values (getted from edit form)
function validateEdit() {
    var newPrice = document.getElementById("newPriceId").value;
    var newStock = document.getElementById("newStockId").value;

    var products = getObjectsFromLS('products');
    var selectedProductId = localStorage.getItem('selectedProductId');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == selectedProductId) {
            products[i].price = newPrice;
            products[i].stock = newStock;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.replace('products.html');
}
// function deleteProduct 
function deleteProduct(pos) {
    var products = getObjectsFromLS('products');
    products.splice(pos, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
// generic function deleteObject
function deleteObject(pos, key) {
    var objects = getObjectsFromLS(key);
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}

// Function deleteOrderAndUpdateStock: that allows to delete order by id and update product stock by ID
function deleteOrderAndUpdateStock(pos, key, idProduct, qty) {
    var objects = getObjectsFromLS(key);
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    // Update product stock
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stock += Number(qty);
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    // reload page
    location.reload();
}
// function generateProductsTable that displays all products into table (from LS: products)
function generateProductsTable() {
    var products = getObjectsFromLS('products');
    var prodcutTable = `
        <table class="table table-striped">
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        prodcutTable += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-success" onclick="confirmProduct(${product.id})">Confirm</button>
                </td>
            </tr>`;
    }
    prodcutTable += '</table>';
    document.getElementById('productTableId').innerHTML = prodcutTable;
}
// function generateUsersTable that displays all users into table (from LS: users)
function generateUsersTable() {
    var users = getObjectsFromLS('users');
    var userTable = `
        <table class="table table-striped">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>`;
    for (let i = 0; i < users.length; i++) {
        var user = users[i];
        userTable += `
            <tr>
                <td>${user.fName}</td>
                <td>${user.lName}</td>
                <td>${user.email}</td>
                <td>${user.tel}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>`;
    }
    userTable += '</table>';
    document.getElementById('userTableId').innerHTML = userTable;
}
// function confirmProduct that changes isConfirmed attribute by true
function confirmProduct(id) {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].isConfirmed = true;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}
//function shopProducts() that displays all confirmed products to simple user
function shopProducts() {
    var products = getObjectsFromLS('products');
    var confirmedProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmed == true) {
            confirmedProducts.push(products[i]);
        }
    }
    var productsDiv = ``;
    for (let i = 0; i < confirmedProducts.length; i++) {
        var product = confirmedProducts[i];
        productsDiv += `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="img/product/p1.jpg" alt="">
								<div class="product-details">
									<h6>${product.name}</h6>
									<div class="price">
										<h6>$${product.price}</h6>
                                        <h6 class="l-through">$ ${product.price}</h6><br>
										<h6>${product.category}</h6>
									</div>
									<div class="prd-bottom">
										<div class="social-info">
											<span class="ti-bag"></span>
											<button class="btn hover-text" onclick="goToDisplay(${product.id})" style="background-color:#fff">Display</button>
										</div>
                                        <div class="social-info">
											<span class="lnr lnr-heart"></span>
											<button class="btn hover-text" onclick="addToWishList(${product.id})" style="background-color:#fff">Wishlist</button>
										</div>
										<a href="" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
							</div>
						</div>`
    }
    document.getElementById('productsDiv').innerHTML = productsDiv;
}
// function addToWishList : create wishlist object and save it to LS (key: wishlist)
function addToWishList(id) {
    var connectedUserId = getConnectedUser();
    var wishListId = JSON.parse(localStorage.getItem('wishListIdKey') || '1');
    var wishlistTab = getObjectsFromLS('wishList');
    var wishListObj = {
        id: wishListId,
        productId: id,
        userId: connectedUserId
    }
    wishlistTab.push(wishListObj);
    localStorage.setItem('wishList', JSON.stringify(wishlistTab));
    localStorage.setItem('wishListIdKey', wishListId + 1);
    location.replace('wishlist.html');

}
// function searchProductById that returns object (product) from local storage
function searchUserById(id) {
    var users = getObjectsFromLS('users');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            findedUser = users[i];
            break;
        }
    }
    return findedUser;
}
// function displayProductInfoByUserRole that displays product informations by Role
function displayProductInfoByUserRole() {
    var connectedUserId = getConnectedUser();
    var productInfoBloc = ``;
    if (connectedUserId) {
        var findedUser = searchUserById(connectedUserId);
        if (findedUser.role == "admin") {
            productInfoBloc = `
            <div class="s_product_text">
                                <h3 id="prName"></h3>
                                <h2 id="prPrice"></h2>
                                <ul class="list">
                                    <li><span id="prCategory"></span> </li>
                                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                </ul>
                                <h4 id="prStock"></h4>
                                <button class="btn btn-warning" onclick="displayEditForm()">Edit product</button>
                            </div>
                            <div id='editFormDiv'></div>`;
        } else {
            productInfoBloc = `
            <div class="s_product_text">
                                <h3 id="prName"></h3>
                                <h2 id="prPrice"></h2>
                                <ul class="list">
                                    <li><span id="prCategory"></span> </li>
                                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                </ul>
                                <h4 id="prStock"></h4>
                                <input type="number" class="form-control" id='reservedQty'  placeholder="Insert quantity"> <br> 
                                <span id='qtyErrorMsg'></span> <br>
                                <button class="btn btn-warning" onclick="reserve()">Reserve product</button>
                                
                            </div>
                            
                            `;
        }
    } else {
        productInfoBloc = `
        <div class="s_product_text">
                        <h3 id="prName"></h3>
                                                <h2 id="prPrice"></h2>
                                                <ul class="list">
                                                    <li><span id="prCategory"></span> </li>
                                                    <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                                </ul>
                                                <h4 id="prStock"></h4>
                            <button class="btn btn-warning" onclick="goToLogin()">Login</button>  
                        </div>   
                        `
    }
    document.getElementById('productInfo').innerHTML = productInfoBloc;
}
function goToLogin() {
    location.replace('login.html');
}
// function reserve that create order objects into LS and update product stock
function reserve() {
    var connectedUserId = getConnectedUser();
    var productId = localStorage.getItem('selectedProductId');
    var qty = document.getElementById('reservedQty').value;
    var product = searchProductById(productId);
    if (Number(product.stock) >= Number(qty)) {
        var orderId = JSON.parse(localStorage.getItem('orderIdKey') || '1');
        var orders = getObjectsFromLS('orders');
        // create order object
        var order = {
            id: orderId,
            qty: qty,
            userId: connectedUserId,
            productId: productId,
            status: false
        }
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('orderIdKey', orderId + 1);
        // update product stock
        updateProductStock(productId, qty);
        location.replace('basket.html');
    } else {
        document.getElementById('qtyErrorMsg').innerHTML = 'Unavailable Qty';
        document.getElementById('qtyErrorMsg').style.color = 'red';
    }
}
// function updateProductStock that updates product stock by new qty
function updateProductStock(id, qty) {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            // products[i].stock = products[i].stock - qty
            products[i].stock -= qty;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}
// basket function that displays all user orders into basket page
function basket() {
    var orders = getObjectsFromLS('orders');
    var connectedUserId = getConnectedUser();
    var myOrders = userOrders(orders, connectedUserId);
    var userBasket = '';
    if (myOrders.length == 0) {
        // No reserved products
        userBasket = `
        <div class="text-center">
            <h2>No reserved Products</h2>
        </div>
        `;
    } else {
        userBasket = `
    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>`;
        var total = 0;
        for (let i = 0; i < myOrders.length; i++) {
            var order = myOrders[i];
            var product = searchProductById(order.productId);
            var total = total + (product.price * order.qty);
            userBasket += `   <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${product.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>$${product.price}</h5>
                                </td>
                                <td>
                                ${order.qty}
                                </td>
                                <td>
                                    <h5>$${product.price * order.qty}</h5>
                                </td>
                                `;
            if (!(order.status)) {
                userBasket += `<td>
                                    <button class="btn btn-danger" 
                                    onclick="deleteOrderAndUpdateStock(
                                        ${getObjectPositionById(order.id, orders)}, 
                                        'orders', 
                                        ${product.id}, 
                                        ${order.qty})">
                                    Delete
                                    </button>
                                </td>
                            </tr>`;
            } else {
                userBasket += `<td>
                                    Your Order is Confirmed By Store
                                </td>
                            </tr>`;
            }
        }
        userBasket += `
                            <tr>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                    <h5>$${total}</h5>
                                </td>
                            </tr>
                            <tr class="shipping_area">
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                    <h5>Shipping</h5>
                                </td>
                                <td>
                                    ${shippingPrice(total)}
                                </td>
                            </tr>
                            <tr class="out_button_area">
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                    <div class="checkout_btn_inner d-flex align-items-center">
                                        <a class="primary-btn" href="#">Proceed to checkout</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>`;
    }
    document.getElementById('userBasket').innerHTML = userBasket;
}
// function that returns position of order into orders by ID
function getObjectPositionById(id, tab) {
    var pos;
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i;
            break;
        }
    }
    return pos;
}
// function userOrders that returns all user Orders by ID
function userOrders(orders, userIdParam) {
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId == userIdParam) {
            myOrders.push(orders[i]);
        }
    }
    return myOrders;
}
// function shippingPrice that returns Free if totalPrice >= 300, else 7$
function shippingPrice(price) {
    // if (price>=300) {
    //     return 'Free';
    // } else {
    //     return '7$';
    // }
    // Ternary Operator
    return (price >= 300) ? 'Free' : '7$';
}
// function logout that remove item 'connectedUserId' from LS
function logout() {
    localStorage.removeItem('connectedUserId');
    location.replace('index.html');
}
// function userInformations that displays user informations 
function userInformations() {
    var connctedUserId = getConnectedUser();
    var user = searchUserById(connctedUserId);
    var userInfo = `
    <div class="s_product_text">
            <h3>First Name : ${user.fName}</h3>
            <h3>Last Name : ${user.lName}</h3>
            <h3>Email : ${user.email}</h3>
            <h3>Tel: ${user.tel}</h3>
            <button class="btn btn-warning" onclick="displayUserEditForm(${user.id})">Edit profile</button>
    </div>
    <div id='editUserForm'></div>`;
    document.getElementById('userInfo').innerHTML = userInfo;
}
// function displayUserEditForm that displays form to edit user email and tel 
function displayUserEditForm(userId) {
    var user = searchUserById(userId);
    var editForm = `
                <div class="row">
                    <div class="col-lg-12">
                        <div class="login_form_inner" style="margin-top:50px">
                            <h3>Edit profile</h3>
                            <div class="row login_form" >
                                <label for="">Email</label>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" id="newEmail" value=${user.email}>
                                </div>
                                <label for="">Tel</label>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" id="newTel" value=${user.tel}>
                                </div>
                                <div class="col-md-12 form-group">
                                    <button type="submit" value="submit" class="primary-btn" onclick="validateUserEdit()">Validate Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    document.getElementById('editUserForm').innerHTML = editForm;
}
// function validateUserEdit that updates new email and tel into lS
function validateUserEdit() {
    var newEmail = document.getElementById("newEmail").value;
    var newTel = document.getElementById("newTel").value;

    var users = getObjectsFromLS('users');
    var connectedUserId = getConnectedUser();
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUserId) {
            users[i].email = newEmail;
            users[i].tel = newTel;
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
// function setHeader
function setHeader() {
    var connectedUserId = getConnectedUser();
    var headerContent = "";
    console.log('connectedUserId', connectedUserId);
    if (connectedUserId) {
        var connectedUser = searchUserById(connectedUserId);
        if (connectedUser.role == 'admin') {
            headerContent = `<ul class="nav navbar-nav menu_nav ml-auto">
            <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                 aria-expanded="false">Products</a>
                <ul class="dropdown-menu">
                    <li class="nav-item"><a class="nav-link" href="products.html">Products List</a></li>
                    <li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>
                    <li class="nav-item"><a class="nav-link" href="add-category.html">Add Category</a></li>
                </ul>
            </li>
            <li class="nav-item"><a class="nav-link" href="manage-orders.html">Orders</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.fName} ${connectedUser.lName}</a></li>
            <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>

            <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
        </ul>`
        } else {
            var orders = getObjectsFromLS('orders');
            var myOrders = userOrders(orders, connectedUserId);
            headerContent = `
            <ul class="nav navbar-nav menu_nav ml-auto">
							<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
							<li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
							<li class="nav-item"><a class="nav-link" href="basket.html">Basket (${myOrders.length})</a></li>
							<li class="nav-item"><a class="nav-link" href="wishlist.html">Wishlist</a></li>
							<li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.fName} ${connectedUser.lName}</a></li>
                            <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
							<li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
						</ul>`;
        }

    } else {
        headerContent = `
        <ul class="nav navbar-nav menu_nav ml-auto">
                                <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
                                <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                                <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                                <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                                <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
                                <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                                <li class="nav-item submenu dropdown">
                                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                     aria-expanded="false">Signup</a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item"><a class="nav-link" href="customer-signup.html">Simple User</a></li>
                                        <li class="nav-item"><a class="nav-link" href="store-signup.html">Admin</a></li>
                                    </ul>
                                </li>
    
                            </ul>`;
    }
    document.getElementById('navbarSupportedContent').innerHTML = headerContent;

}
// function displayUserWishlist
function displayUserWishlist() {
    var connectedUserId = getConnectedUser();
    var wishListTab = getObjectsFromLS('wishList');
    var myWishList = [];
    var wishListTable = '';
    for (let i = 0; i < wishListTab.length; i++) {
        if (wishListTab[i].userId == connectedUserId) {
            myWishList.push(wishListTab[i]);
        }
    }

    if (myWishList.length == 0) {
        wishListTable = `
            <h1 class="text-center pb-5" >No WishList products</h1>
        `
    } else {
        wishListTable = `
         <div>
            <h1 class="text-center pb-5" >WishList products</h1>
        </div>
        <table class="table table-striped">
        <tr>
            <th>Product Name</th>
            <th>product Price</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>`;
        for (let i = 0; i < myWishList.length; i++) {
            var wishList = myWishList[i];
            var product = searchProductById(wishList.productId);
            wishListTable += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td> <button class="btn btn-success" onclick="goToDisplay(${product.id})">Reserve</button>
           <button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(wishList.id, wishListTab)}, 'wishList')">Delete</button>
        </tr>`;
        }
        wishListTable += '</table>';
    }

    document.getElementById('wishListTable').innerHTML = wishListTable;
}
// function to display admin Orders
function displayAdminOrders() {
    var connectedUserId = getConnectedUser();
    var allProducts = getObjectsFromLS('products');
    var adminProducts = getUserProducts(connectedUserId, allProducts);
    var allOrders = getObjectsFromLS('orders');
    var adminOrders = getAdminOrders(adminProducts, allOrders);
    generateAdminOrdersTable(adminOrders);

}
// function getAdminOrders  that returns all admin orders
function getAdminOrders(myProducts, orders) {
    var adminOrders = [];
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < myProducts.length; j++) {
            if (orders[i].productId == myProducts[j].id) {
                adminOrders.push(orders[i]);
            }
        }
    }
    return adminOrders;
}
// function generateAdminOrdersTable that generate order rows and inner into HTML
function generateAdminOrdersTable(adminOrders) {
    var ordersTable = '';
    if (adminOrders.length == 0) {
        ordersTable = `
        <div class="text-center">
            <h2>No orders</h2>
        </div>`;
    } else {
        ordersTable = `
         <div class="text-center">
            <h2>All orders</h2>
        </div>
        <table class="table table-striped">
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Tel</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Unit Price</th>
            <th>Total HT</th>
            <th>Total TTC</th>
            <th>Actions</th>
        </tr>`;
        for (let i = 0; i < adminOrders.length; i++) {
            var order = adminOrders[i];
            var user = searchUserById(order.userId);
            var product = searchProductById(order.productId);
            ordersTable += `
        <tr>
            <td>${user.fName}</td>
            <td>${user.lName}</td>
            <td>${user.tel}</td>
            <td>${product.name}</td>
            <td>${order.qty}</td>
            <td>${product.price}</td>
            <td>${order.qty * product.price}</td>
            <td>${order.qty * product.price * 1.19}</td>  
        `;
            if (!(order.status)) {
                ordersTable += `
            <td><button class="btn btn-info" onclick="confirmOrder(${order.id})">Confirm</button></td>
            </tr>`;
            } else {
                ordersTable += `
            <td>Order is validated !</td>
            </tr>`;
            }
        };
        ordersTable += '</table>';
    }
    document.getElementById('adminOrders').innerHTML = ordersTable;
}
// function confirmOrder to update order status to true
function confirmOrder(id) {
    // update order status
    var orders = getObjectsFromLS('orders');
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            orders[i].status = true;
            break;
        }
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    location.reload();
}
// function searchProducts
function searchProducts() {
    var products = getObjectsFromLS('products');
    var productName = document.getElementById('searchedValue').value;
    var productsDiv = '';
    var s = 0;
    for (let i = 0; i < products.length; i++) {
        if ((products[i].name).toLowerCase() == productName.toLowerCase() && products[i].isConfirmed) {
            s += 1;
            productsDiv = productsDiv + `
            <div class="col-lg-3 col-md-6">
                            <div class="single-product">
                                <img class="img-fluid" src="img/product/p1.jpg" alt="">
                                <div class="product-details">
                                    <h6> ${products[i].name}</h6>
                                    <div class="price">
                                        <h6>$${products[i].price}</h6>
                                        <h6 class="l-through">$${products[i].price}</h6>
                                    </div>
                                    <h6> ${products[i].category}</h6>
                                    <h6> ${products[i].stock}</h6>
                                    <div class="prd-bottom">

                                        <div class="social-info">
                                            <span class="ti-bag"></span>
                                            <button class="btn hover-text" onclick="goToDisplay(${products[i].id})" style="background-color:#fff;">Display</button>
                                        </div>
                                        <div class="social-info">
                                            <span class="ti-bag"></span>
                                            <button class="btn hover-text" onclick="deleteObject(${getObjectPositionById(products[i].id, products)}, 'products')" style="background-color:#fff;">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        }
    }
    if (s == 0) {
        document.getElementById('findedProductsDiv').innerHTML = `
        <div class = 'text-center'><h1>No founded products</h1></div>
        `;
    } else {
        document.getElementById('findedProductsDiv').innerHTML = productsDiv;
    }
}
// function generateAllProducts that generate products table
function generateAllProducts() {
    var products = getObjectsFromLS('products');
    var prodcutTable = `
        <h1 class='text-center'>All Products </h1>
        <table class="table table-striped">
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product = products[i];
        prodcutTable += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
                <td>
                    <input type="checkbox" name="" id="${product.id}" onclick="addToArray(this)">
                </td>
            </tr>`;
    }
    prodcutTable += `</table>
    <div> <button class='btn btn-danger' onclick="deleteAllCheckedProducts()">Delete</button> </div>
    `;
    document.getElementById('allProductsTable').innerHTML = prodcutTable;
}
var checkedRows = [];
// function addToArray that add checked row id to Array
function addToArray(element) {
    checkedRows.push(element.id);
}
// function deleteAllCheckedProducts that loops all products and delete checked rows
function deleteAllCheckedProducts() {
    var products = getObjectsFromLS('products');
    for (let i = 0; i < checkedRows.length; i++) {
        products.splice(getObjectPositionById(Number(checkedRows[i]), products), 1);
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}

function alertMsg(msg) {
    alert('Bonjour  ' + msg);
};