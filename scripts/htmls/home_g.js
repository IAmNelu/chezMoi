'use strict'

const homePageUser = `
    <nav class="navbar navbar-white bg-white">
        <div class="row d-flex justify-content-center mt-4">
            <div class="col-9">
                <form class="form-inline row" id="wordSearchForm">
                    <div class="col-2">
                        <button class="btn btn-outline-success" type="submit" id="searchWordButton">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class="col-10">
                        <input class="form-control" type="search" placeholder="Are you hungry?" aria-label="Search"
                            id="wordToSearch">
                    </div>
                </form>
            </div>
            <div class="col-2">
                <button class="btn btn-outline-success" id="searchButton">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </nav>

    
    
    <!-- Map with connection to places in cards -->
    <div class="row mx-1 my-4">
        <div class="col-12">
            <div id="mapid"></div>
        </div>
    </div>

    <div class="container margin_bootom_big">
        <div id="guest_events"></div>
    </div>
    
    <footer>
        <nav class="navbar-light bg-light fixed-bottom py-3">
            <div class="container">
                <div class="row">
                    <div class="col-3 text-center"><i class="fa fa-search btn_ico" aria-hidden="true"></i><br>Search
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
    </footer>`;


function getOneEventGuest(eventObj) {
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


function _set_events_guest(events_arr) {
    let events_container = $("#guest_events");

    if (!events_arr | events_arr.length == 0) {
        //error no events
    } else {
        let _events = "";
        for (let _i = 0; _i < events_arr.length; _i++) {
            const element = events_arr[_i];
            _events += getOneEventGuest(element);
        }
        events_container.html(_events);
        for (let _i = 0; _i < events_arr.length; _i++) { //adding images with css after objs are created
            const element = `url("${events_arr[_i].picture}")`;
            let im_id = `#img_${events_arr[_i].id}`;
            $(im_id).css("background-image", element);
            let art_id = `#art_${events_arr[_i].id}`;
            $(art_id).click(_ => goToShowEventGuest(events_arr[_i].id))
            //TODO: ADD FUNCTION TO CLICK AND SHOW EVENT
        }
    }
}

function get_events_guests() {
    var events = [];

    var conditions = null;
    if (mySS.getItem("conditions")) {
        conditions = JSON.parse(mySS.getItem("conditions"));
    } else {
        conditions = {
            "rating": null,
            "max_price": null,
            "guest_num": null,
            "date": null,
            "hour": null,
            "radius": null,
            "tags": []
        }
    }

    // REMOVE AFTER INSERTING REAL DATE CONDITION IN FORM
    // conditions.date = "01/01/2021";
    // conditions.hour = "20:00";
    // REMOVE AFTER INSERTING REAL DATE CONDITION IN FORM

    var searchWord = null;
    if (mySS.getItem("searchWord") && mySS.getItem("searchWord") != "") {
        searchWord = mySS.getItem("searchWord");
        searchWord = searchWord.toLowerCase();
        console.log(searchWord)
    }

    var keys = Object.keys(mySS);
    var i = keys.length;

    // Load events
    while (i--) {
        try {
            let user = JSON.parse(mySS.getItem(keys[i]));
            if (user.events) {
                for (var i = 0; i < user.events.length; i++) {
                    events.push(user.events[i]);
                    events[i].ratings = user.ratings;
                    events[i].full_address = user.addresses[events[i].adr]
                }
            }
        }
        catch (err) {
            console.log('not a JSON');
        }
    }

    // check for search conditions
    var filetered_events = [];
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var checksConditions = true;
        if (conditions.rating && checksConditions) {
            if (event.ratings < conditions.rating) {
                checksConditions = false;
            }
        }
        if (conditions.max_price && checksConditions) {
            if (event.price > conditions.max_price) {
                checksConditions = false;
                console.log('max price exceded')
            }
        }
        if (conditions.guest_num && checksConditions) {
            if ((event.max_guests - event.actual_guests) <= conditions.guest_num) {
                checksConditions = false;
                console.log('too many guests for this event')
            }
        }
        if (conditions.date && checksConditions) {
            // Set condition date
            var conditionDate = conditions.date;
            conditionDate = conditionDate.split("-");
            var year = conditionDate[0];
            var month = conditionDate[1];
            var day = conditionDate[2];
            if (conditions.hour) {
                var conditionHour = conditions.hour;
                conditionHour = conditionHour.split(":");
                var hour = conditionHour[0];
                var min = conditionHour[1];
                conditionDate = new Date(day, month, year, hour, min);
            } else {
                conditionDate = new Date(day, month, year);
            }
            // Set event date
            var eventDate = event.date;
            var eventHour = event.hour;
            eventDate = eventDate.split("/");
            eventHour = eventHour.split(":");
            var day = eventDate[0];
            var month = eventDate[1];
            var year = eventDate[2];
            var hour = eventHour[0];
            var min = eventHour[1];
            eventDate = new Date(day, month, year, hour, min);
            if (eventDate > conditionDate) {
                checksConditions = false;
                console.log('the date of this event is after the deadline');
            }
        }
        if (conditions.radius && checksConditions) {
            var eventLat = event.full_address.lat;
            var eventLon = event.full_address.long;
            var user_postion = JSON.parse(mySS.getItem("user_position"));
            var userLat = user_postion.latitude;
            var userLon = user_postion.longitude;
            var distance_meters = getDistanceFromLatLonInKm(eventLat, eventLon, userLat, userLon) * 1000;
            if (distance_meters > conditions.radius) {
                checksConditions = false;
                console.log('this event is too distant')
            }
        }
        for (var j = 0; j < conditions.tags.length; j++) {
            var tag = conditions.tags[j];
            if (tag && !event.tags.includes(tag)) {
                checksConditions = false;
                console.log('this event does not include ', tag)
            }
        }

        if (searchWord) {
            var evenDescription = (event.Description).toLowerCase();
            var eventName = (event.name).toLowerCase();
            if (!evenDescription.includes(searchWord) && !eventName.includes(searchWord)) {
                checksConditions = false;
                console.log('the word', searchWord, 'is not in this event');
            }
        }

        // Add radius and date condition

        if (checksConditions) {
            filetered_events.push(event);
        }
    }
    return filetered_events
}

function searchWordSubmit() {
    var wordToSearch = document.getElementById('wordToSearch').value;
    mySS.removeItem('conditions');
    if (!wordToSearch || wordToSearch == "") {
        mySS.removeItem('searchWord');
        let events = get_events_guests();
        _set_events_guest(events);
    } else {
        mySS.setItem('searchWord', (wordToSearch));
        let events = get_events_guests();
        _set_events_guest(events);
    }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
