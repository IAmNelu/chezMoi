'use strict'

const booking = `
<div class="container margin_centered">
        <header>
            <div class="row py-2">
                <i class="fa fa-arrow-left back_arrow" id="back" aria-hidden="true"></i>
                <h2 class="screen_title col-10">Payment</h2>
            </div>
            <div class="col-12 text-center">
                <span>
                    <h1 class="profile_name text-center">
                        Chicken
                    </h1>
                </span><br>
                <div class="text-center">
                    <i class="fa fa-clock-o"></i>20:00 -
                    <i class="fa fa-calendar"></i> 15/01/2021<br>
                    <i class="fa fa-map"></i> 221b, Baker Street
                </div>

            </div>
            <div class="container py-2">
                <form action="" id="booking_form">
                    <div class="form-group">


                        <div class="row mt-3">
                            <label for="BookingGuestInput" class="col-7 text-center">Number of guests:</label>
                            <input class="col-4" type="number" min="1" max="4" name="BookingGuestInput"
                                id="BookingGuestInput" required>
                        </div>
                        <div>
                            <h3 id="total_price" class="text-center">
                                Price: 10€
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
                                                        </span></label>
                                                    <div class="input-group"> <input type="number" placeholder="MM"
                                                            name="" class="form-control" required> <input type="number"
                                                            placeholder="YY" name="" class="form-control" required>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group mb-4"> <label data-toggle="tooltip"
                                                        title="Three digit CV code on the back of your card">
                                                        <h6>CVV <i class="fa fa-question-circle d-inline"></i>
                                                        </h6>
                                                    </label> <input type="text" required class="form-control">
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