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
    
    <div id="guest_events"></div>
    
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


    function _set_events_guest(events_arr) {
        let events_container = $("#guest_events");
    
        if (!events_arr | events_arr.length == 0) {
            //error no events
        } else {
            let _events = "";
            for (let _i = 0; _i < events_arr.length; _i++) {
                const element = events_arr[_i];
                _events += getOneEvent(element);
            }
            events_container.html(_events);
            for (let _i = 0; _i < events_arr.length; _i++) { //adding images with css after objs are created
                const element = `url("${events_arr[_i].picture}")`;
                let im_id = `#img_${events_arr[_i].id}`;
                $(im_id).css("background-image", element);
                let art_id = `#art_${events_arr[_i].id}`;
                $(art_id).click(_ => goToShowEvents(events_arr[_i].id))
                //TODO: ADD FUNCTION TO CLICK AND SHOW EVENT
            }
    
        }
    }

function get_events_guests(){
    var events = [];

    var conditions = null;
    if ( mySS.getItem("conditions") ){
        conditions = JSON.parse( mySS.getItem("conditions") );
    } else {
        conditions = {
            "rating" : null,
            "max_price" : null,
            "guest_num": null,
            "date": null,
            "hour": null,
            "radius": null,
            "tags": []
        }
    }

    var keys = Object.keys(mySS);
    var i = keys.length;

    while ( i-- ) {
        try {
            let user = JSON.parse( mySS.getItem(keys[i]) );
            if ( user.events ){
                for(var i = 0; i < user.events.length; i++) {
                    events.push( user.events[i] );
                    events[i].ratings = user.ratings;
                    events[i].full_address = user.addresses[events[i].adr]
                }
            }
          }
          catch(err) {
            console.log('not a JSON');
          }
    }
    var filetered_events = [];
    for(var i = 0; i < events.length; i++) {
        var event = events[i];
        var checksConditions = true;
        if ( conditions.rating && checksConditions ){
            if ( event.ratings < conditions.rating ){
                checksConditions = false;
            }
        }
        if ( conditions.max_price && checksConditions ){
            if ( event.price > conditions.max_price ){
                checksConditions = false;
                console.log('max price exceded')
            }
        }
        if ( conditions.guest_num && checksConditions ){
            if ( (event.max_guests - event.actual_guests) <= conditions.guest_num ){
                checksConditions = false;
                console.log('too many guests for this event')
            }
        }
        for(var j = 0; j < conditions.tags.length; j++) {
            var tag = conditions.tags[j];
            if (tag && !event.tags.includes(tag)){
                checksConditions = false;
                console.log('this event does not include ', tag)
            }
        }

        // Add radius and date condition

        if ( checksConditions ) {
            filetered_events.push(event);
        }
    }
    return filetered_events
}