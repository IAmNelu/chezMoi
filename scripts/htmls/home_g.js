'use strict'

const homePageUser = `
    <!-- Search bar -->
    <div class="d-flex justify-content-center m-3">
        <form class="form-inline">
            <button class="btn btn-outline-success col-2 mr-1" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
            <input class="form-control col-7" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success col-2 ml-1" id="searchButton"><i class="fa fa-bars" aria-hidden="true"></i></button>
        </form>
    </div>
    
    <!-- Map with connection to places in cards -->
    <div class="col-12 container-fluid justify-content-center mb-3 mt-3" >
        <div id="mapid" style=" height: 300px; max-width: 500px "></div>
    </div>
    
    
    <div class="container margin_bootom_big">
        <article class="card mb-3">
            <div class="row">
                <div class="col-6">
                    <div class="image_card" id="chicken_img"></div>
                </div>
                <div class="col-6">
                    <h3>Chicken</h3>
                    <div class="row">
                        <p class="col-6">10 €</p>
                        <p class="col-6">4/6 <i class="fa fa-user" aria-hidden="true"></i></p>
                    </div>
                    <p class="incard_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
                        architecto?</p>

                </div>
            </div>
        </article>
        <article class="card mb-3">
            <div class="row">
                <div class="col-6">
                    <div class="image_card" id="fish_img"></div>
                </div>
                <div class="col-6">
                    <h3>Fish</h3>
                    <div class="row">
                        <p class="col-6">15 €</p>
                        <p class="col-6">1/8 <i class="fa fa-user" aria-hidden="true"></i></p>
                    </div>
                    <p class="incard_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
                        architecto?</p>

                </div>
            </div>
        </article>
    </div>
    
    <footer>
        <nav class="navbar-light bg-light fixed-bottom py-3">
            <div class="container">
                <div class="row">
                    <div class="col text-center"><i class="fa fa-search btn_ico" aria-hidden="true"></i><br>Search
                    </div>
                    <div class="col text-center"><i class="fa fa-heart-o btn_ico" aria-hidden="true"></i><br>Favourites
                    </div>
                    <div class="col text-center"><i class="fa fa-comments-o btn_ico" aria-hidden="true"></i><br>Messages
                    </div>
                    <div class="col text-center"><i class="fa fa-user-circle-o btn_ico" aria-hidden="true"></i><br>Profile
                    </div>
                </div>
            </div>
        </nav>
    </footer>`;