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
            if (hosts.includes(user_name)) {
                mySS.setItem('logged_in', user_name);
                logged_in = mySS.getItem('logged_in');
                goHostProfile();
            } else {
                mySS.setItem('logged_in', user_name);
                logged_in = mySS.getItem('logged_in');
                console.log("not here");
                goToHome();
            }

        }
    })

}

function showMap() {
    var map = L.map('mapid').setView([51.505, -0.11], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var cooking_mama = L.marker([51.5, -0.09]).addTo(map);

    var you = L.marker([51.508, -0.11]).addTo(map);

    cooking_mama.bindPopup('<img src="images/profile_cooking_mama.png" class="w-100"><br><br><b>Cooking mama</b>')
        .openPopup();

    you.bindPopup('<i class="fa fa-user-circle-o btn_ico" aria-hidden="true"></i><br><br><b>You are here</b>')
        .openPopup();
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
