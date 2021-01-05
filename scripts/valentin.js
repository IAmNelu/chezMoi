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
// mySS.setItem("logged_in", "user_id_1");
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

// USER ID
function get_user_id() {
    return id = mySS.getItem('logged_in');
}

function get_user() {
    let id = get_user_id();
    let user = JSON.parse(mySS.getItem(id));
    return user;
}

function get_event_id() {
    let user = get_user();
    return user.envents;
}

function get_events(event_id) {
    return JSON.parse(mySS.getItem(event_id));
}

function get_event(e_id) {
    let events_id = e_id.split("__")[1];
    let event_array = get_events(events_id);
    let event = event_array.filter(e => e.id == e_id)[0];
    return event;
}

function post_event(event) {
    let ev_id = get_event_id();
    let events_arr = get_events(ev_id);
    events_arr.push(event);
    const v = JSON.stringify(events_arr);
    mySS.setItem(ev_id, v);
}


//event function
function edit_event(event_id) {
    let x = get_event(event_id);
    console.log('edit');
    console.log(x);

}

function show_event(event_id) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    router.navigate(`/show/${event_id}`);
}


// ROUTING

function _set_imgs_profile(propic_l, bck_l) {
    let pl = `url("${propic_l}")`;
    let bl = `url("${bck_l}")`;
    $(".main_location_pic").first().css("background-image", bl);
    $(".avatar_profile").first().css("background-image", pl);
}


function _set_events(ev_id) {
    let events_container = $("#events");
    let events_arr = get_events(ev_id);
    if (!events_arr | events_arr.length == 0) {
        //error no events
    } else {
        _events = "";
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
            $(art_id).click(_ => show_event(events_arr[_i].id))
            //TODO: ADD FUNCTION TO CLICK AND SHOW EVENT
        }

    }
}

function add_event_listeners() {
    $('#add_new_event').click(() => router.navigate('/create'));
    $('#go_back').click(() => router.navigate('/profile'));
    $("#btn_create_event").click(() => {
        let mesg = add_newEvent();
        if (mesg == 'OK') router.navigate('/profile');
        else alert(mesg);
    });

}

function showProfile() {
    let user = get_user();
    app.innerHTML = getUserPage(user);
    _set_imgs_profile(user.pro_pric, user.bcg_pic);
    _set_events(user.envents);
    adjust_header();
    adjust_profile();
    add_event_listeners();
}

function showCreateEvent() {
    app.innerHTML = get_create_page();
    // let loginForm = document.getElementById('loginForm');
    // loginForm.onsubmit = () => goToHome();
    add_event_listeners();


}

function add_newEvent() {
    let ev_name = $('#EventNameInput').val();
    let ev_description = $('#EventDescriptionInput').val();
    let ev_price = parseInt($('#EventPriceInput').val());
    let ev_max_guests = parseInt($('#EventGuestsInput').val());
    console.log(ev_max_guests)
    if (ev_name.length == 0) return "Missing Name";
    if (ev_description.length == 0) return "Missing Description";
    if (!ev_price) return "Missing Price";
    if (!ev_max_guests) return "Missing Number of Guests";

    let event = {
        "name": ev_name,
        "price": ev_price,
        "max_guests": ev_max_guests,
        "actual_guests": 0,
        "Description": ev_description,
        "date": "01/01/2021",
        "long": "",
        "lat": "",
        "picture": "../images/fish_meal.png"
    }
    post_event(event);

    return 'OK';
}

function showEditEvent() {
    app.innerHTML = loginPage;
    let loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = () => goToHome();
}

function showEvent(ev) {
    //serve un event
    app.innerHTML = get_show_event_page(ev);

}
let root = "/chezMoi/";
let useHash = true; // Defaults to: false
let hash = '#!'; // Defaults to: '#'
const router = new Navigo(root, true, '#!');

router
    .on(showProfile) //home page
    .on("/profile/", showProfile)
    .on("/create/", showCreateEvent)
    .on("/edit/", showEditEvent)
    .on("/show/:id", param => {
        let ev = get_event(param.id)
        showEvent(ev);
    })
    .on("*", showProfile)
    .resolve();