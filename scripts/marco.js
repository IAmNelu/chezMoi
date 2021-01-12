'use strict';


//TODO (?) check if logged user already booked -> what about booking we want to "remove"? ->2.0
//TODO (?) Favourites -> 2.0
//TODO (?) metadata

//TODO: evaluate star rate


let price = 0
let guest_possible = 0

function showProduct() {
    app.innerHTML = product
    getProductInfo();
    adjust_header();
    adjust_profile();
    showMap();
    setFavourite();
    backToMenu();
    toPayment();
};

window.onresize = function () {
    adjust_header();
    adjust_profile();
}

function adjust_profile() {
    let prof_av = $('.avatar_profile').first();
    let w = prof_av.width();
    prof_av.height(w);
    if (window.innerHeight > window.innerWidth) {
        //portrait
        prof_av.css('margin-top', '-6em');
    } else {
        prof_av.css('margin-top', '-16em');
    }
}

function adjust_header() {
    let prof_av = $('.main_location_pic').first();
    if (window.innerHeight > window.innerWidth) {
        //portrait
        prof_av.css('height', '12em');
    }
    else {//landscape
        prof_av.css('height', '32em');
    }

}

function showMap() {
    var map = L.map('mapid').setView([51.5, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var chicken = L.marker([51.5, -0.09]).addTo(map);

    chicken.bindPopup('<img src="images/chicken_meal.jpg" class="w-100"><br><br><b>Chicken</b>')
        .openPopup();
}

function setFavourite() {
    let icon = document.getElementById("favourite")
    icon.onclick = () => {
        if (icon.classList.contains("fa-heart-o")) {
            icon.classList.remove("fa-heart-o")
            icon.classList.add("fa-heart")
            //add to favourites
        }
        else {
            icon.classList.remove("fa-heart")
            icon.classList.add("fa-heart-o")
            //remove from favourites
        }
    }
}

function getProductInfo() {

}

function backToMenu() {
    let back = document.getElementById("back")
    back.onclick = () => {
        console.log("button pressed")
    }
}

function toPayment() {
    let b = document.getElementById("book")
    b.onclick = () => {
        price = document.getElementById("price").innerText.split('\n')[1].split('€')[0]
        guest_possible = document.getElementById("guests").innerText.split('/')[1] - document.getElementById("guests").innerText.split('/')[0]
        let route = '/book';
        router.navigate(route);
    }
}

function showBooking() {
    app.innerHTML = booking
    setPriceAndUpdate(price)
    setMaxGuests()
    handlePayment()
    backToProduct()
}

function setMaxGuests() {
    let form = document.forms[0];
    let guests = form.elements["BookingGuestInput"]
    for (let i = 1; i < guest_possible; i++) {
        guests.options[guests.options.length] = new Option(i + 1, i + 1);
    }
    guests.onchange = () => {
        //form.checkValidity()
        let n = guests.value
        let total = n * price
        setPriceAndUpdate(total)
    }
}

function setPriceAndUpdate(p) {
    document.getElementById("total_price").innerText = "Price: \n" + p + "€"
}

function handlePayment() {
    let form = document.forms["booking_form"];
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
    })
    //Debit cart
    let button = form.elements["submit"]
    button.addEventListener('click', () => {
        if (form.checkValidity()) {
            //update guest availability for that meal
            let route = '/confirm';
            router.navigate(route);
        }
    })

    //Paypal
    let button2 = form.elements["submit_paypal"]
    button2.addEventListener('click', () => {
        if (form.elements["BookingGuestInput"].value <= guest_possible) {
            //update guest availability for that meal
            let route = '/confirm';
            router.navigate(route);
        }
    })




}

function showConfirm() {
    app.innerHTML = payment_accepted
    setTimeout(function () {
        let route = '/Product';
        router.navigate(route);
    }, 1500)
}

function backToProduct() {
    let back = document.getElementById("back")
    back.onclick = () => {
        let route = '/Product';
        router.navigate(route);
    }
}


const router = new Navigo(null, true, '#!');

router
    .on("/Product", showProduct)
    .on("/book", showBooking)
    .on("/confirm", showConfirm)
    .on("*", showProduct)
    .resolve();