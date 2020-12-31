window.onload = function () {
    adjust_header();
    adjust_profile();
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

function hide_small_description() {
    $('#small_description').hide();
}

function show_small_description() {
    $('#small_description').show();
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
    showProfile();
}

function cancel_edit() {
    showProfile();
}

// READING JSON
mySS = window.sessionStorage;
// $.getJSON("/data/users.json", function (json) {
//     let keys = Object.keys(json)
//     for (let _i = 0; _i < keys.length; _i++) {
//         const k = keys[_i];
//         const v = JSON.stringify(json[k]);
//         mySS.setItem(k, v);
//     }
//     return;
// });
// $.getJSON("/data/events.json", function (json) {
//     let keys = Object.keys(json)
//     for (let _i = 0; _i < keys.length; _i++) {
//         const k = keys[_i];
//         const v = JSON.stringify(json[k]);
//         mySS.setItem(k, v);
//     }
//     return;
// });



// ROUTING

function _set_imgs_profile(propic_l, bck_l) {
    let pl = `url("${propic_l}")`;
    let bl = `url("${bck_l}")`;
    $(".main_location_pic").first().css("background-image", bl);
    $(".avatar_profile").first().css("background-image", pl);
}


function _set_events(ev_id, uid) {
    let events_container = $("#events");
    let events_arr = JSON.parse(mySS.getItem(ev_id));
    if (!events_arr | events_arr.length == 0) {
        //error no events
    } else {
        _events = "";
        for (let _i = 0; _i < events_arr.length; _i++) {
            const element = events_arr[_i];
            _events += getOneEvent(element, _i, uid);
        }
        events_container.html(_events);
        for (let _i = 0; _i < events_arr.length; _i++) { //adding images with css after objs are created
            const element = `url("${events_arr[_i].picture}")`;
            let im_id = `#img_${_i}_event_${uid}`;
            $(im_id).css("background-image", element);
            let art_id = `#art_${_i}_event_${uid}`;
            //TODO: ADD FUNCTION TO CLICK AND SHOW EVENT
        }

    }
}

function add_event_listeners() {
    $('#add_new_event').click(() => router.navigate('/create'));
}

function showProfile() {
    let id = "user_id_1"
    let user = JSON.parse(mySS.getItem(id));
    console.log(user);
    app.innerHTML = getUserPage(user);
    _set_imgs_profile(user.pro_pric, user.bcg_pic);
    _set_events(user.envents, id);
    adjust_header();
    adjust_profile();
    add_event_listeners();
}

function showCreateEvent() {
    app.innerHTML = get_create_page();
    // let loginForm = document.getElementById('loginForm');
    // loginForm.onsubmit = () => goToHome();
}
function showEditEvent() {
    app.innerHTML = loginPage;
    let loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = () => goToHome();
}

const router = new Navigo(null, true, '#!');

router
    .on("/profile/", showProfile)
    .on("/create/", showCreateEvent)
    .on("/edit", showEditEvent)
    .on("*", showProfile)
    .resolve();