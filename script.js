// Daftar produk dengan gambar
const products = [
    { id:  1, name: 'gery salut', price: 2000, img: 'img/gerry-salut.jpeg'},
    { id:  2, name:  'choki stix', price: 2000, img: 'img/choki-stik.jpeg'},
    { id:  3, name:  'sari gandum', price: 2000, img: 'img/sari-gandum.jpeg'},
    { id:  4, name:  'slai olai', price: 2000, img: 'img/slai-olai.jpeg'},
    { id:  5, name:  'popcorn', price: 2000, img: 'img/pop-cron.jpeg'}
];

//keranjang belanja
let cart =[];

//fungsi untuk menampilkan daftar produk
function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML =`
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>RP ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambahkan ke keranjang</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}


//fungsi untuk menambah produk ke keranjang belanja
function addToCart(productId) {
    const product=products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);  


    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({...product,quantity: 1 });
    }

    updateCart();
}

//fungsi untuk menampilkan isi keranjang belanja
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML ='';

   let totalPrice = 0;  // konsisten dengan penamaan yang dipakai di dalam loop
    cart.forEach(item => {
        const listItem = document.createElement('li');  // 'Element' bukan 'EIement'
listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;  // 'textContent' case sensitive

        cartItemsContainer.appendChild(listItem);
        
        totalPrice += item.price * item.quantity;

    });
document.getElementById('total-price').textContent = totalPrice;

}

//fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('keranjang anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment =prompt(`Total belanja anda Rp ${total}. masukkan jumlah pembayaran:`);
    
    if (payment >= total) {
        alert(`pembayaran berhasil! kembalian anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('uang anda tidak mencukupi.');
    }
}

//Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

//Tampilkan produk saat halaman dimuat
displayProducts();