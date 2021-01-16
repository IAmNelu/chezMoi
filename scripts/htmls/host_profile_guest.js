'use strict'

function getUserPage_Guest(userObj) {
    const user = `
    <header class="main_location_pic">
    <button class="previous round px-2 py-1 ml-3 mt-3" id="back">
    <i class="fa fa-arrow-left " aria-hidden="true"></i>
</button>
    </header>

    <div class="container margin_bottom_big">
        <div class="avatar_profile"></div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="profile_name">${userObj.name} <span class="ratings" id="actual_rate">${userObj.ratings}<i class="fa fa-star"
                            aria-hidden="true"></i></span></h1>
                            <div class="rating py-2" id="vote"> 
                            <button class="btn btn-light  ml-2" id="rate"> rate me!</button>
                            <input type="radio" class="r" name="rating" value="5" id="5" checked><label for="5">☆</label> 
                            <input type="radio" class="r" name="rating" value="4" id="4"><label for="4">☆</label> 
                            <input type="radio" class="r" name="rating" value="3" id="3"><label for="3">☆</label> 
                            <input type="radio" class="r" name="rating" value="2" id="2"><label for="2">☆</label> 
                            <input type="radio" class="r" name="rating" value="1" id="1"><label for="1">☆</label>
                            
                            </div>            
        </div>
</div>
        <article>
            <header>
                    <h4 class="text-center">About ME</h4>
             </header>   
            <div id="small_description">
                <div class="row">
                    <p class="col-12">
                        ${userObj.description.slice(0, 200)}
                    </p>
                </div>
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-light" type="button" data-toggle="collapse"
                            onclick="hide_small_description()" data-target="#collapseDescription" aria-expanded="false"
                            aria-controls="showFullDescription">
                            Show More
                        </button>
                    </div>
                </div>
            </div>
            <div class="collapse" id="collapseDescription">
                <div class="row">
                    <p class="col-12">
                    ${userObj.description}
                    </p>
                </div>
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-light" type="button" data-toggle="collapse"
                            data-target="#collapseDescription" aria-expanded="false" aria-controls="collapseDescription"
                            onclick="show_small_description()">
                            Show Less
                        </button>
                    </div>
                </div>
            </div>
        </article>
        <div id="events"></div>

    </div>
        
    
    <footer>
        <nav class="navbar-light bg-light fixed-bottom py-3">
            <div class="container">
                <div class="row">
                    <div class="col-3 text-center" id="up"><i class="fa fa-search btn_ico" aria-hidden="true"></i><br>Search
                    </div>
                    <div class="col-3 text-center"><i class="fa fa-heart-o btn_ico" aria-hidden="true"></i><br>Favourites
                    </div>
                    <div class="col-3 text-center"><i class="fa fa-comments-o btn_ico" aria-hidden="true"></i><br>Messages
                    </div>
                    <div class="col-3 text-center" id="goToProfile"><i class="fa fa-user-circle-o btn_ico" aria-hidden="true"></i><br>Profile
                    </div>
                </div>
            </div>
        </nav>
    </footer>
    `
    return user
}

function getOneEvent_g(eventObj) {
    const event = `
    <article id="art_${eventObj.id}" class="card mb-3">
            <div class="row">
                <div class="col-6">
                    <div class="image_card " id="img_${eventObj.id}"></div>
                </div>
                <div class="col-6">
                    <h3>${eventObj.name}</h3>
                    <div class="row">
                        <p class="col-6">${eventObj.price} €</p>
                        <p class="col-6">${eventObj.actual_guests}/${eventObj.max_guests} <i class="fa fa-user" aria-hidden="true"></i></p>
                    </div>
                    <p class="incard_description">${eventObj.Description.slice(0, 50)}</p>
                    <div class="row d-flex justify-content-between">
                        <div>
                            <span class=" col-6 incard_date align-self-center">${eventObj.date}</span><br>
                            <span class=" col-6 incard_date align-self-center">${eventObj.hour} <i class="fa fa-clock-o"></i>
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </article>`
    return event;
}

function handle_rate(usr) {
    let l = getListVoted()
    for (let elem in l) {
        if (usr == l[elem]) {
            document.getElementById("vote").parentNode.removeChild(document.getElementById("vote"))
            return
        }
    }

    let button = document.getElementById("rate")
    button.addEventListener('click', () => {
        var rated_value = $('.r:checked').val();
        let r = update_usr_rate(usr, rated_value)
        document.getElementById("vote").parentNode.removeChild(document.getElementById("vote"))
        document.getElementById("actual_rate").innerHTML = `${r}<i class="fa fa-star"
        aria-hidden="true"></i>`
    })
}


function _set_imgs_profile_g(propic_l, bck_l) {
    let pl = `url("${propic_l}")`;
    let bl = `url("${bck_l}")`;
    $(".main_location_pic").first().css("background-image", bl);
    $(".avatar_profile").first().css("background-image", pl);
}


function _set_events_g(events_arr) {
    let events_container = $("#events");

    if (!events_arr | events_arr.length == 0) {
        //error no events
    } else {
        let _events = "";
        for (let _i = 0; _i < events_arr.length; _i++) {
            const element = events_arr[_i];
            _events += getOneEvent_g(element);
        }
        events_container.html(_events);
        for (let _i = 0; _i < events_arr.length; _i++) { //adding images with css after objs are created
            const element = `url("${events_arr[_i].picture}")`;
            let im_id = `#img_${events_arr[_i].id}`;
            $(im_id).css("background-image", element);
            let art_id = `#art_${events_arr[_i].id}`;
            $(art_id).click(_ => goToShowEventGuest(events_arr[_i].id))
        }

    }
}


function hide_small_description() {
    $('#small_description').hide();
}

function show_small_description() {
    $('#small_description').show();
}