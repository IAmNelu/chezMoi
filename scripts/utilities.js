
var map = null;

// Form handling
function handle_login() {
    let form = document.forms["loginForm"];
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
    })
    let button = form.elements["log_in"]
    button.addEventListener('click', () => {
        if (form.checkValidity()) {
            let user_name = form.elements["usr"].value;
            let hosts = JSON.parse(mySS.getItem("hosts"));
            mySS.removeItem("rated")
            if (hosts.includes(user_name)) {
                mySS.setItem('logged_in', user_name);
                logged_in = mySS.getItem('logged_in');
                goToHostLogin();
            } else {
                mySS.setItem('logged_in', user_name);
                logged_in = mySS.getItem('logged_in');
                goToHome();
            }

        }
    })

}

function showMap() {
    _map_stuff();
    getLocation();
}

function _map_stuff() {

    var user_postion = JSON.parse(mySS.getItem("user_position"));
    if (!user_postion)
        user_postion = { latitude: 40.554222599, longitude: 17.7236034 }
    let w = parseInt(window.innerWidth * 0.9);
    $('#mapid').width(w);
    $('#mapid').height(w);
    if (map == null) {
        map = new L.Map('mapid');
    }
    map.setView([user_postion.latitude, user_postion.longitude], 13);



    // if ($('#mapid').children().length == 0) {
    //     var map = L.map('mapid').setView([user_postion.latitude, user_postion.longitude], 13);
    // } else {
    //     var map = L.map('mapid');
    // }


    //var map = L.map('mapid').setView([40.554222599, 17.7236034], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Mark your position
    var you = L.marker([user_postion.latitude, user_postion.longitude]).addTo(map);
    you.bindPopup('<i class="fa fa-user-circle-o btn_ico" aria-hidden="true"></i><br><br><b>You are here</b>')
        .openPopup();


    // Mark position of all hosts in a certain area
    let events = get_events_guests();
    for (let _j = 0; _j < events.length; _j++) {
        const s_e = events[_j];
        let adr_id = s_e.adr;
        let lat_lon = get_user_from_event_id(s_e.id).addresses[adr_id];
        let marker_tmp = L.marker([lat_lon.lat, lat_lon.long]).addTo(map);
        marker_tmp.bindPopup('<img src="' + s_e.picture + '" class="w-100"><br><br><b>' + s_e.name + '</b>')
            .openPopup();

    }

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("no geolocation")
    }
}

function showPosition(position) {
    user_position = {
        "longitude": position.coords.longitude,
        "latitude": position.coords.latitude
    }
    mySS.setItem('user_position', JSON.stringify(user_position));
    _map_stuff();
}

function handleGoToProfile() {
    let hosts = JSON.parse(mySS.getItem("hosts"));
    let user_id = get_user_id();
    if (hosts.includes(user_id)) {
        goHostProfile();
    } else {
        alert("You have to be registered as host to access the profile!");
    }
}

//users function
// USER ID
function get_user_id() {
    return id = mySS.getItem('logged_in');
}

function get_user() {
    let id = get_user_id();
    let user = JSON.parse(mySS.getItem(id));
    return user;
}

function get_user_from_event_id(id) {
    return JSON.parse(mySS.getItem(id.split("__").pop()))
}


//graphics
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


function adjust_profile_g() {
    let prof_av = $('.avatar_profile_g').first();
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

function sow_edit(uid) {
    let user = JSON.parse(mySS.getItem(uid));
    $("#small_description").show();
    $("#collapseDescription").hide();
    let sm = $("#small_description");
    sm.html(getForm(user.description, user.id));
}

function edit_description(uid) {
    let user = JSON.parse(mySS.getItem(uid));
    let new_desc = $('#form_description_area').val();
    user.description = new_desc;
    let v = JSON.stringify(user);
    mySS.setItem(uid, v);
    showHostProfile();
}
function cancel_edit() {
    showHostProfile();
}

function getListVoted() {
    let result = JSON.parse(mySS.getItem("rated"))
    return result
}

function update_usr_rate(uid, value) {
    let l = getListVoted()
    if (l == null)
        l = [uid]
    else
        l.push(uid)
    mySS.setItem("rated", JSON.stringify(l))
    let u = JSON.parse(mySS.getItem(uid))

    let total = u.ratings * u.n_ratings
    u.n_ratings++
    let new_rate = Math.round(((total + parseInt(value)) / u.n_ratings) * 100) / 100
    u.ratings = new_rate
    mySS.setItem(uid, JSON.stringify(u))
    return new_rate
}