const products = [
    {
        id: 1,
        name: "Apple",
        price: 12000,
        imgUrl: "img/ap.png"
    },
    {
        id: 2,
        name: "Nokia",
        price: 20000,
        imgUrl: "img/ap2.png"
    },
    {
        id: 3,
        name: "Apple 2",
        price: 10000,
        imgUrl: "img/ap3.png"
    },
    {
        id: 4,
        name: "Samsung",
        price: 5000,
        imgUrl: "img/ap.png"
    },
    {
        id: 4,
        name: "Samsung",
        price: 5000,
        imgUrl: "img/ap.png"
    }
]

const productsId = document.getElementById('products');
const ad = document.getElementById('ad');

const basketTotal = document.getElementById('total');

const searchBtn = document.getElementById('search__btn');
const searchInput = document.getElementById('search__input')

products.forEach(product => {
    productsId.innerHTML += `
            <div class="col-lg-3 mb-3">
                <div class="product">
                    <img src=${product.imgUrl} alt="#">
                    <h5>${product.name}</h5>
                    <h6>${product.price} сом</h6>
                    <button class="product__basket-btn" data-id=${product.id} data-name=${product.name} data-price=${product.price}>Добавить в корзину</button>
                    <button  class="products__basket-btn" data-id=${product.id} data-name=${product.name} data-price=${product.price}>Удалить из корзины</button>
                </div
            </div>
`
})

const addBasketBtns = document.querySelectorAll('.product__basket-btn');
const delBasketBtns = document.querySelectorAll('.products__basket-btn');



// добавление рекламы

const handleAd = {
    counterElement: document.getElementById('ad__counter-count'),
    btnElement: document.getElementById('closeBtn'),
    showAd: function () {
        setTimeout(function () {
            ad.classList.add('active')
            this.interval();
        }.bind(this), 1000);
    },
    interval: function () {
        let count = 10;
        this.setIntervalId = setInterval(function () {
            count--
            this.counterElement.textContent = count;
            if (count === 0) {
                this.counterElement.textContent = "можете закрыть рекламу"
                clearInterval(this.setIntervalId);
                this.btnElement.disabled = false;
            }
        }.bind(this), 1000)
    },
    hideAd: function () {
        ad.classList.remove('active');
    }
}
//--------

/// добавление в корзину

let cart = {};

function showSum() {
    const totalSumJson = localStorage.getItem('TotalSum');
    const totalSum = JSON.parse(totalSumJson);
    basketTotal.textContent = totalSum;
}

function setLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function setTotalSum() {
    let cartJson = localStorage.getItem('cart');
    let cart = JSON.parse(cartJson);
    let total = 0;
    for (let i in cart) {
        total += cart[i].price * cart[i].count;
        // total = cart[i].price * cart[i].count + total;
    }
    localStorage.setItem('TotalSum', JSON.stringify(total));

    showSum();

    
}

localStorage.removeItem('products__')



function addToBasket(e) {
    e.preventDefault();
    const dataSet = e.target.dataset;
    const data = {
        id: dataSet.id,
        name: dataSet.name,
        price: +dataSet.price
    }
    const cartFromLocalStorage = localStorage.getItem('cart');
    const cartObject = JSON.parse(cartFromLocalStorage);
    cart = {
        ...cartObject
    }

    if (cart[data.id]) {
        cart[data.id].count++
        cart[data.id].productSum = data.price * cart[data.id].count
    } else {
        cart[data.id] = {
            count: 1,
            name: data.name,
            price: +data.price,
            productSum: 1 * data.price
        }
    }
    setLocalStorage();
    setTotalSum();
}
function delToBasket(e) {
    e.preventDefault();
    const dataSet = e.target.dataset;
    const data = {
        id: dataSet.id,
        name: dataSet.name,
        price: +dataSet.price
    }
    const cartFromLocalStorage = localStorage.getItem('cart');
    const cartObject = JSON.parse(cartFromLocalStorage);
    cart = {
        ...cartObject
    }

    if (cart[data.id]) {
        cart[data.id].count--
        cart[data.id].productSum = data.price * cart[data.id].count
    }
     if (
        cart[data.id].count === 0){
            delete cart [data.it]
        }
     
    setLocalStorage();
    setTotalSum();
}




////
//поиск
function searchFunc(e) {
    e.preventDefault();

    let filterProduct = [];
    const value = searchInput.value;
    if (!value.trim()) {
        alert("поле пустое")
    }else {
        let filterProduct = [];
        const regex = new RegExp(`^${value}`, 'gi');
        products.forEach(product => {
            const result = regex.test(product.name);
            if (result) {
                filterProduct.push(product)
            }
        })
        productsId.innerHTML = '';
        if(filterProduct.length > 0) {
            filterProduct.forEach(product => {
                productsId.innerHTML += `
            <div class="col-lg-3 mb-3">
                <div class="product">
                    <img src=${product.imgUrl} alt="#">
                    <h5>${product.name}</h5>
                    <h6>${product.price} сом</h6>
                    <button class="product__basket-btn" data-id=${product.id} data-name=${product.name} data-price=${product.price}>Добавить в корзину</button>
                    <button class="products__basket-btn" data-id=${product.id} data-name=${product.name} data-price=${product.price}>Удалить из корзины</button>
                </div
            </div>
`
            })
        }else {
            productsId.innerHTML = `<p>ничего не найдено</p>`;
        }

    }




    console.log(filterProduct);
}





// handleAd.showAd();
showSum();
searchBtn.addEventListener('click', searchFunc)
handleAd.btnElement.addEventListener('click', handleAd.hideAd);


addBasketBtns.forEach(addBasketBtn => {
    addBasketBtn.addEventListener('click', addToBasket);
})
delBasketBtns.forEach(delBasketBtn => {
    delBasketBtn.addEventListener('click', delToBasket);
})


