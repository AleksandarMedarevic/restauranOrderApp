// javascript
import {menuArray} from "/data.js"
let orderClass=``

let totalPrice=``
let fullName=``
let createMenuArray= ``

let mainContainer= document.getElementById("mainContainer")
let orderContainer = document.getElementById("orderContainer")
let ordersArray = []

menuArray.forEach(function(item){
     createMenuArray += `
     <div class="menuItem"> 
            <div class="food">${item.emoji}</div>
            <div class="menuCentral">
                <p><h2>${item.name}</h2></p>
                <p>${item.ingredients}</p>
                <p>$ ${item.price}</p>
            </div>
            <div>
                <p><button class="button button5" id="push-button" data-add="${item.id}">+</button></p>
                <!-- <p><button class="button button5">-</button></p> -->
            </div>
        </div>
     `
mainContainer.innerHTML= createMenuArray 

menuArray.forEach(order => {
    order['homMany'] =1
    });
       
}) 

/*let pushBtn= document.getElementById("push-button")*/

document.addEventListener('click', function(e){
    
    if(e.target.dataset.add){
       handleOrder(e.target.dataset.add*1) 
    } 
    if(e.target.dataset.remove){
       removeOrder(e.target.dataset.remove*1) 
    } 
    if(e.target.dataset.close){
       close()
    } 
    if (e.target.dataset.complete){
       document.getElementById("modal").style.display="block" 
    } 
    if (e.target.dataset.order){
    e.preventDefault()
    close()
    form.reset()
    ordersArray.length = 0
    totalPrice=0
    let homMany=0
    const loginFormData = new FormData(document.getElementById("form"))
    fullName = loginFormData.get('fullName')
    document.getElementById("finalMessage").innerHTML=`
    Dear ${fullName}, thank you for using our service. 
    <p>Your order in on the way. </p> 
    <p>Bon Appétit</p>` 
    document.getElementById("finalMessage").style.display= "block"
    orderContainer.innerHTML= ``
    document.addEventListener("click", function(){
        document.getElementById("finalMessage").style.display= "none"
    })
    
    }
})
    
function handleOrder(idOrder){
    const targetOrder = menuArray.filter(function(order){
        return order.id === idOrder
    })[0]
    if(ordersArray.includes(targetOrder)) {
        targetOrder.homMany +=1
    }
    else {
        ordersArray.unshift(targetOrder)
    }
    render()
    scroll()
} 
function removeOrder(idOrder){
    const targetOrder = ordersArray.filter(function(order){
        return order.id === idOrder
    })[0]
    //console.log(targetOrder)
    ordersArray.shift(targetOrder)
    render()
}     

function render(){
    let orderContainer = document.getElementById("orderContainer")
    let feedHtml = ``
    totalPrice=0
    ordersArray.forEach(function(order){
        feedHtml += `
        <div class="orders">
                <div>${order.name} </div> <div><button class="button button6" data-remove="${order.id}">remove order (-)</button> </div>
                <div>$${order.price * order.homMany*1}</div>
        </div>`
        totalPrice = totalPrice*1
        totalPrice += order.price * order.homMany*1
    })
    if (totalPrice===0) {
        orderClass= "hide"
    }
    orderContainer.innerHTML= ` <div class="orderContainer ${orderClass}">
    <h2>Your order<h2>` + feedHtml + `<div class="orderLine"></div><div class="orders"> <div>Total price:</div>` 
    + `$`+totalPrice +`</div> <button class="orderBtn" data-complete="complete" type="submit">Complete order</button> </div>`
    orderClass=``
}



function close() {
    document.getElementById("modalHeader").parentElement.style.display = "none";
}
