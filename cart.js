var add = document.getElementsByClassName("add");

for (let index = 0; index < add.length; index++) {
    add[index].addEventListener("click",
        function () { addTocart(this); }
    )
}

// initializing variable(var)
var sibs = [];
var getPrice;
var getProductname;
var cart = [];
var stringCart;


function addTocart(e) {
    // get productname and price using getelement
    // it is telling d classname to find the parent 
    // div and get the element in the attribute to getelement
    // price and productname 
    parentDiv = e.parentElement;
    getProductname = parentDiv.querySelector('.product').innerText;
    getPrice = parentDiv.querySelector('.price').innerText;
    // create product object
    var product = {
        product: getProductname,
        price: getPrice
    }
    // convert object to json making use of stringnify
    var stringify = JSON.stringify(product)
    /*send product data to session storage */
    if (!sessionStorage.getItem("cart")) {
        // append product Json object to cart array
        cart.push(stringify)
        // cart to json
        stringCart = JSON.stringify(cart);
        //append product JSON object to cart array
        sessionStorage.setItem('cart', stringCart);
        addedtocart(getProductname);
        updateCartTotal();
    }
    else {
        // get existing cart data
        // from storage and convert back into array
        cart = JSON.parse(sessionStorage.getItem(('cart')))
        // append new product Json object
        cart.push(stringify);
        // cart back to json
        stringCart = JSON.stringify(cart);
        // overwrite cart data in sessionStorage
        sessionStorage.setItem('cart', stringCart)
        addedTocart(getProductname);
        updateCartTotal()
    }
    // user feedback on successful add
    function addedTocart(pname) {
        var message = pname + " " + "was added to cart";
        // create an alert
        window.alert(message);
        // there re still some code i did not write here
    }

}
function updateCartTotal() {
    // initialize
    // item in the table 
    var item = 0;
    var total = 0;
    var price = 0;
    var productname = "";
    var cartTable = "";
    //get cart data & parse to array
    if (sessionStorage.getItem('cart')) {
        var cart = JSON.parse(sessionStorage.getItem('cart'))
        //get no of items in cart 
        item = cart.length;
        //loop over cart array
        for (var i = 0; i < item; i++) {
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i])
            console.log(x)
            //get property value of price
            price = x.price.toFixed(2);
            productname = x.product;
            //add price to total
            carttable += "<tr><td>" + productname
                + "</tr></td>" + price.toFixed(2) + "<tr><td>"
            total += price;
        }
    }

    document.getElementById("total").innerHTML= total.toFixed(2);
    document.getElementById("carttable").innerHTML = carttable;

    console.log(item)
    document.getElementById("itemsquantity").innerHTML = item;

}
updateCartTotal();
