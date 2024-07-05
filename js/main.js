
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let searchInp = document.getElementById('searchInp');

let mood = 'create'
let tmp;

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

    if (title.value != '' && price.value != '' && category.value != '' && newProduct.count <= 100) {
        if (mood == 'create') {
            // count
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
        } else {
            products[tmp] = newProduct;
            localStorage.setItem('products', JSON.stringify(products));
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }
    else {
        alert('Please check your data');
    }
    clearData();
    showData();
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

    searchInp.value = '';
}

showData();
// read data
function showData() {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        table += `<tr>
                        <td class="text-center">${i + 1}</td>
                        <td class="text-center">${products[i].title || '-'}</td>
                        <td class="text-center">${products[i].price || '-'}</td>
                        <td class="text-center">${products[i].taxes || '-'}</td>
                        <td class="text-center">${products[i].ads || '-'}</td>
                        <td class="text-center">${products[i].discount || '-'}</td>
                        <td class="text-center">${products[i].category || '-'}</td>
                        <td class="text-center"><button onclick="updateData(${i})" class="btn btn-success" style="width: 90px;">Update</button>
                        </td>
                        <td class="text-center"><button onclick="deleteData(${i})" class="btn btn-danger" style="width: 90px;">Delete</button></td>
                    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;

    if (table == '') {
        table = `<tr>
                    <td class="text-center" colspan="9">No Data Found</td>
                </tr>`;
        document.getElementById('tbody').innerHTML = table;
    }
}

// delete
function deleteData(i) {
    products.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(products));
    showData();
    clearData();
}

function deleteAll() {
    localStorage.clear();
    products.splice(0);
    showData();
    clearData();
}

// update
function updateData(i) {
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    getTotal();

    count.style.display = 'none';
    category.value = products[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// search
function search(value) {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].title.toLowerCase().includes(value.toLowerCase()) || products[i].category.toLowerCase().includes(value.toLowerCase())) {
            table += `<tr>
                    <td class="text-center">${i + 1}</td>
                    <td class="text-center">${products[i].title || '-'}</td>
                    <td class="text-center">${products[i].price || '-'}</td>
                    <td class="text-center">${products[i].taxes || '-'}</td>
                    <td class="text-center">${products[i].ads || '-'}</td>
                    <td class="text-center">${products[i].discount || '-'}</td>
                    <td class="text-center">${products[i].category || '-'}</td>
                    <td class="text-center"><button onclick="updateData(${i})" class="btn btn-success" style="width: 90px;">Update</button>
                    </td>
                    <td class="text-center"><button onclick="deleteData(${i})" class="btn btn-danger" style="width: 90px;">Delete</button></td>
                </tr>`;
        }
    }

    document.getElementById('tbody').innerHTML = table;

    if (table == '') {
        table = `<tr>
                    <td class="text-center" colspan="9">No Data Found</td>
                </tr>`;
        document.getElementById('tbody').innerHTML = table;
    }
}

clearData();