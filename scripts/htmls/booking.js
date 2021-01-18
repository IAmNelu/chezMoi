'use strict'

function booking_page(ev) {
    return `
<div class="container margin_centered">
        <header>
            <div class="row pt-2">
                <i class="fa fa-arrow-left back_arrow mx-2" id="back" aria-hidden="true"></i>
                <h2 class="text-center col-10">Payment</h2>
            </div>
            <div class="col-12 text-center">
                <span>
                    <h1 class="profile_name text-center">
                        ${ev.name}
                    </h1>
                </span><br>
                <div class="text-center">
                    <i class="fa fa-clock-o"></i>${ev.price} -
                    <i class="fa fa-calendar"></i> ${ev.date}<br>
                    <i class="fa fa-map"></i> 221b, Baker Street
                </div>

            </div>
            <div class="container py-2">
                <form action="" id="booking_form">
                    <div class="form-group">


                        <div class="row mt-3">
                            <label for="BookingGuestInput" class="col-7 text-center">Number of guests:</label>
                            <select class="col-4" name="BookingGuestInput"
                                id="BookingGuestInput" required>
                                <option class="active" value="1">1</option>
                            </select>
                        </div>
                        <div>
                            <h3 id="total_price" class="text-center">
                                Price: <br>${ev.price}€
                            </h3>
                        </div>
                        <div class="text-center">
                            Payment method:

                        </div>
                        <div class="row">
                            <div class="col-lg-6 mx-auto">

                                <div class="bg-white shadow-sm pt-4 pl-2 pr-2 pb-2">
                                    <!-- Credit card form tabs -->
                                    <ul role="tablist" class="nav bg-light nav-pills rounded nav-fill mb-3">
                                        <li class="nav-item"> <a data-toggle="pill" href="#credit-card"
                                                class="nav-link active "> <i class="fa fa-credit-card mr-2"></i>
                                                Credit Card </a> </li>
                                        <li class="nav-item"> <a data-toggle="pill" href="#paypal" class="nav-link "> <i
                                                    class="fa fa-paypal mr-2"></i> Paypal
                                            </a> </li>
                                    </ul>
                                </div> <!-- End -->
                                <!-- Credit card form content -->
                                <div class="tab-content">
                                    <!-- credit card info-->
                                    <div id="credit-card" class="tab-pane fade show active pt-3">
                                        <div class="form-group">
                                            <label for="username">
                                                <h6>Card Owner</h6>
                                            </label> <input type="text" name="username" placeholder="Card Owner Name"
                                                required class="form-control ">
                                        </div>
                                        <div class="form-group">
                                            <label for="cardNumber">
                                                <h6>Card number</h6>
                                            </label>
                                            <div class="input-group"> <input type="text" name="cardNumber"
                                                    placeholder="Valid card number" class="form-control " required>
                                                <div class="input-group-append">
                                                    <span class="input-group-text text-muted">
                                                        <i class="fa fa-cc-visa mx-1">
                                                        </i>
                                                        <i class="fa fa-cc-mastercard mx-1">
                                                        </i>
                                                        <i class="fa fa-cc-amex mx-1">
                                                        </i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <div class="form-group"> <label><span class="hidden-xs">
                                                            <h6>Expiration Date</h6>
                                                            <div id="error" class="d-none warning"> Check your expiration date </div>

                                                        </span></label>
                                                    <div class="input-group"> <input id="month" type="number" placeholder="MM"
                                                            name="month" class="form-control" max=12 min=0 required> <input type="number"
                                                            placeholder="YY" name="year" class="form-control" id="year" max=99 min=0 required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4 align-bottom">
                                                <div class="form-group"> 
                                                        <h6>CVV <br>(3 digit number)
                                                        </h6>
                                                    </label> <input type="text" pattern="[0-9]{3}" required class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row justify-content-center">

                            <button type="submit" id="submit" class="btn btn-primary col-sm-6">Book</button>
                        </div>

                                    </div> <!-- End -->
                                    <!-- Paypal info -->
                                    <div id="paypal" class="tab-pane fade pt-3">
                                        <h6 class="pb-2">Select your paypal account type</h6>
                                        <div class="form-group "> <label class="radio-inline"> <input type="radio"
                                                    name="optradio" checked> Domestic </label> <label
                                                class="radio-inline">
                                                <input type="radio" name="optradio" class="ml-5">International </label>
                                        </div>
                                        <p> <button type="button" id="submit_paypal" class="btn btn-primary "><i
                                                    class="fa fa-paypal mr-2"></i> Log into my Paypal</button> </p>
                                        <p class="text-muted"> Note: After clicking on the button, you will be
                                            directed to a secure gateway for payment. After completing the payment
                                            process, you will be redirected back to the website to view details of
                                            your order. </p>
                                    </div> <!-- End -->


                                </div>
                            </div>
                        </div>
                </form>
        </header>
    </div>

`
}



const payment_accepted = `<div class="d-flex justify-content-center mt-5 mb-5 m-3">
<img src="images/logo.png" class="col-10">
</div>

<div class="text-center">
Payment accepted
</div>`

function setMaxGuests(ev) {
    let form = document.forms[0];
    let guests = form.elements["BookingGuestInput"]
    for (let i = 1; i < (ev.max_guests - ev.actual_guests); i++) {
        guests.options[guests.options.length] = new Option(i + 1, i + 1);
    }
    guests.onchange = () => {
        let n = guests.value
        let total = n * ev.price
        setPriceAndUpdate(total)
    }
}

function setPriceAndUpdate(p) {
    document.getElementById("total_price").innerText = "Price: \n" + p + "€"
}

function handlePayment(ev) {
    let form = document.forms["booking_form"];
    form.addEventListener("submit", (e) => {
        e.preventDefault()
    })
    //Debit cart
    let button = form.elements["submit"]
    button.addEventListener('click', () => {
        if (form.checkValidity()) {
            if (!CheckExpiration(form.elements["month"].value, form.elements["year"].value)) {
                document.getElementById("error").classList.remove("d-none")
            }
            else {
                ev.actual_guests = parseInt(ev.actual_guests) + parseInt(form.elements["BookingGuestInput"].value)
                app.innerHTML = payment_accepted
                setTimeout(function () {
                    let u = get_user_from_event_id(ev.id)
                    u.events[ev.id.split("_")[1]] = ev
                    mySS.setItem(u.id, JSON.stringify(u))
                    goToShowEventGuest(ev.id)
                }, 1500)
            }
        }
    })

    //Paypal
    let button2 = form.elements["submit_paypal"]
    button2.addEventListener('click', () => {
        if (form.elements["BookingGuestInput"].value <= (ev.max_guests - ev.actual_guests)) {
            ev.actual_guests = parseInt(ev.actual_guests) + parseInt(form.elements["BookingGuestInput"].value)
            app.innerHTML = payment_accepted
            setTimeout(function () {

                let u = get_user_from_event_id(ev.id)
                u.events[ev.id.split("_")[1]] = ev

                mySS.setItem(u.id, JSON.stringify(u))
                goToShowEventGuest(ev.id)
            }, 1500)
        }
    })
}

function CheckExpiration(m, y) {
    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear() - 2000
    if (y > year || (m >= month && y == year)) {
        return true
    }
    else
        return false
}




