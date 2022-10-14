import { menuArray } from "./data.js";

let menuHTML = ``
let order = []
const orderButtons = document.getElementsByClassName('add-item')
const showOrderTotal = document.getElementById('show-order-total')
const removeButton = document.getElementsByClassName('remove-button')
// get data from menuArray
// and display it
function showMenu() {
    menuArray.forEach(function (item) {
    // here we iterate through each object in
    // the menuArray and store an HTML
    // representation of it in menuHTML 
    // as a template literal. we are 
    // representing these objects from
    // menuArray: item.emoji, item.name,
    // item.ingredients, and item.price 
    // and accessing them with dot notation
    // we also include a button and access it
    // with dot notation and asking for the 
    // object's id

        menuHTML += `
        <div class="menu-item">
            <div class="emoji">${item.emoji}</div>
            <div class="item-infos">
                <h2>${item.name}</h2>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-item" id="${item.id}">+</button>
            </div>  
                    `
    })

    return menuHTML
}
function render() {
// taking control of the 
// div that will render 
// the template literal stored
// in menuHTML's function
// showMenu. then we call
// render() to make the 
// menu items display
   document.getElementById("menu-items").innerHTML = showMenu()
}

render()

// getOrderInfos(order)
function showOrderInfo(order) {
    showPopup()
    order.forEach(function (item) {
        document.getElementById('order-details').innerHTML += `
            <div class="order-item">
            <p>${item.name}\u00A0\u00A0 </p>
            <p></p>
            <p class="item-quantity"><span>Quantity</span>
            ${item.count}\u00A0</p>
            <button class="remove-btn">remove</button>
            </div>
            <div id="order-price">
            <p class="order-price">$${item.price}</p>
            </div>

        `

    })
}

// addFood()

function selectedFood() {
    let total = 0

    for(let i = 0; i < orderButtons.length; i++){
        menuArray[orderButtons[i].id].count = 0

        orderButtons[i].addEventListener("click", function(){
            total+= menuArray[orderButtons[i].id].price
            if(!order.includes(menuArray[orderButtons[i].id])){
                menuArray[orderButtons[i].id].count += 1
                order.push(menuArray[orderButtons[i].id])
            } else {
                menuArray[orderButtons[i].id].count += 1
            }
            if(order.length > 0) {
                showOrderTotal.innerHTML = `

                    <h3 class="your-order">Your order</h3>
                    <div id="order-details">
                    </div>
                    <div class="total-order">
                    <h3 class="total-price">Total Price</h3>
                    <p class="total">$${total}</p>
                    </div>
                    <button id="complete-order" class="green-btn">
                    Complete order
                    </button>
                
                `
                
            }
            showOrderInfo(order)
        })
    }
}

selectedFood()




function showPopup(){
    document.getElementById("complete-order")
    .addEventListener("click", function(){
        document.getElementById('form-popup').classList
        .remove("hidden")
    })
}
function handleForm() {
    const payForm = document.getElementById('pay-form')
    const formPopUp = document.getElementById('form-popup')
    payForm.addEventListener("submit", function(e){
        e.preventDefault()
        let name = document.getElementById("cardName").value
        formPopUp.classList.add('hidden')
        showOrderTotal.innerHTML = `
            <p class="thank-you-order">Thank you for order
            ${name} ! </p>
        `
    })
}

handleForm()