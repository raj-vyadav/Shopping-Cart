let shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let genericShop =()=>{
   return (shop.innerHTML = shopItemsData.map((x)=>{
      let search = basket.find((y)=> y.id === x.id) || [];
       return `
   <div id=product-id-${x.id} class="item">
         <img width="220" src="${x.img}" alt="">
         <div class="details">
            <h3>${x.name}</h3>
            <p>${x.desc}</p>
            <div class="price-quantity">
               <h2>$ ${x.price}</h2>
               <div class="buttons">
                  <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                  <div id=${x.id} class="quantity">
                  ${search.item === undefined ? 0: search.item}
                  </div>
                  <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
               </div>
            </div>
         </div>
      </div>
   `
   }).join(""))
};


genericShop();
// function abcd() {}
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
   localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id)=> {
   let search = basket.find((x)=> x.id === id);
   document.getElementById(id).innerHTML = search.item;
   console.log(search.item);
   calculation();
};

let calculation = ()=> {
   let cartIcon = document.getElementById("cartAmount");
   cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x, y)=> x+y,0)
}
calculation();