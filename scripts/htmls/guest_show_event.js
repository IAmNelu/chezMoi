'use strict'

function get_guest_show_event(ev, usr) {
    return `
<header class="main_location_pic">
        <button class="previous round px-2 py-1 ml-3 mt-3" id="back">
            <i class="fa fa-arrow-left " aria-hidden="true"></i>
        </button>

    </header>
    <div class="avatar_profile " id = "img_profile"></div>
    <div class="container margin_bootom_big margin_centered">

        <div class="margin_bootom_medium">
            <article>
                <div class="row">
                    <div class="col-12 text-center">
                        <span>
                            <i class="fa fa-heart-o text-left fa-2x" id="favourite" aria-hidden="true"></i>
                            <h1 class="profile_name text-center">
                                ${ev.name}
                            </h1>
                        </span><br>
                        <div class="text-center">
                        
                        <i class="fa fa-star"></i>${usr.ratings}, ${usr.name} <br>
                            <i class="fa fa-clock-o"></i>${ev.hour} -
                            <i class="fa fa-calendar"></i> ${ev.date}<br>
                            <i class="fa fa-map"></i> ${usr.addresses[ev.adr].full_address}<br>
                        </div>

                    </div>
                </div>
            </article>
        </div>
        <article>
            <header class="text-center">
                <h4> Meal description & Menu</h4>
            </header>
            <div id="Description">
                <div class=" text-justify ">
                    <p class="px-2 ">
                        ${ev.Description}
                    </p>

                </div>
            </div>
        </article>

        <!-- Map with connection to places in cards -->
        <article>
            <header class="text-center">
                <h4> Where is it?</h4>
            </header>
            <div class="col-12 container-fluid justify-content-center mb-3 mt-3">
                <div id="mapid" style=" height: 300px; max-width: 500px text-center"></div>
            </div>
        </article>

        <article>
            <header class="text-center">
                <h4> Tags </h4>
            </header>
            <ul class="text-center">
                <div id="tags" class="row mx-2">
                    
                </div>
            </ul>
        </article>
    </div>
    <footer class="fixed-bottom">
        <nav class="navbar-light bg-light fixed-bottom ">
            <div class="container py-3">
                <div class="row ">
                    <div class="col text-center" id="price"><i class="fa fa-euro btn_ico" aria-hidden="true"></i><br>${ev.price}€
                    </div>
                    <div class="col text-center" id="guests"><i class="fa fa-users btn_ico" aria-hidden="true"></i><br>
                        ${ev.actual_guests}/${ev.max_guests}
                    </div>
                    <div class="col text-center" id="book"><i class="fa fa-sign-in btn_ico" aria-hidden="true"></i><br>Book
                    </div>
                </div>
            </div>
        </nav>
    </footer>
`
}

function create_event_map(ev, adr) {
    var map = L.map('mapid').setView([adr.lat, adr.long], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var chicken = L.marker([adr.lat, adr.long]).addTo(map);

    chicken.bindPopup(`<img src="${ev.picture}" class="w-100"><br><br><b>${ev.name}</b>`)
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

function setTags(t) {
    let tags = document.getElementById("tags")
    for (let i in t) {
        tags.innerHTML += `<li class="col-6">${t[i]}</li>`
    }

}