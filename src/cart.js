let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = ()=> {
   let cartIcon = document.getElementById("cartAmount");
   cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x, y)=> x+y,0)
}
calculation();

let genericCartItems = () => {
   if(basket.length !== 0) {
      return (shoppingCart.innerHTML = basket.map((x)=> {
         let {id, item} = x;
         let search = shopItemsData.find((y)=> y.id === id) || [];
         let {img, name, price} = search;
         return `
         <div class="cart-item">
         <img width="100" src="${img}"/>
         <div class="details">
           <div class="title-price-x">
              <h4>
                <p>${name}</p>
                <p class="cart-item-price">$${price}<p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
           </div>
           <div class="cart-buttons">
           <div class="buttons">
               <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
               <div id=${x.id} class="quantity">
               ${item}
               </div>
               <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
            </div>
           </div>
           <h3>$${item * price}</h3>
         </div>
         </div>
         `
      }).join(""));
   }
   else {
      shoppingCart.innerHTML = ``;
      label.innerHTML = `
      <h2>Cart is empty</h2>
      <a href = "index.html">
        <button class="homeBtn">Back to home</a>
      </a>
      `
   }
}
genericCartItems();
let increment = (id)=> {
   let selectedItem = id;
   let search = basket.find((x) => x.id === selectedItem.id);

   if (search === undefined) {
      basket.push({
         id: selectedItem.id,
         item: 1
      })
   } else {
      search.item += 1;
   }
   update(selectedItem.id);
   genericCartItems();
   localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id)=> {
   let selectedItem = id;
   let search = basket.find((x) => x.id === selectedItem.id);
   if (search === undefined || search.item === 0) {
      return;
   } else {
      search.item -= 1;
   }
   update(selectedItem.id);
   basket = basket.filter((x)=> x.item !== 0);
   genericCartItems();
   localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id)=> {
   let search = basket.find((x)=> x.id === id);
   document.getElementById(id).innerHTML = search.item;
   console.log(search.item);
   calculation();
   TotalAmount();
};

let removeItem = (id) => {
   let selectedItem = id;
   basket = basket.filter((x)=> x.id !== selectedItem.id);
   genericCartItems();
   TotalAmount();
   calculation();
   localStorage.setItem("data", JSON.stringify(basket));
};
let clearCart = () => {
   basket = [];
   genericCartItems();
   calculation();
   localStorage.setItem("data", JSON.stringify(basket));
}
let TotalAmount = ()=> {
   if (basket.length !== 0) {
      let amount = basket.map((x)=> {
         let {item, id} = x;
         let search = shopItemsData.find((y)=> y.id === id) || [];
         return search.price * item;
      }).reduce((x, y)=> x+y,0);
      label.innerHTML = `
      <h2>Total Bill : $${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `
   }
   else {
      return;
   }
   
}
TotalAmount();