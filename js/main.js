
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


// get total price
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    } else {
        total.innerHTML = '';
    }
}

// create product
let products;

if (localStorage.getItem('products') != null) {
    products = JSON.parse(localStorage.getItem('products'));
}
else {
    products = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }

    if (title.value != '' && price.value != '') {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                products.push(newProduct);
                // save data to local storage
                localStorage.setItem('products', JSON.stringify(products));
            }
        } else {
            products.push(newProduct);
            // save data to local storage
            localStorage.setItem('products', JSON.stringify(products));
        }
    }
    clearData();
}

// clear form data after submit
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    console.log(dataProduct);
}

// read data
// count
// delete
// update
// clean data
// search
// filter
// sort

