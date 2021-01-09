const router = new Navigo('/', true, '#!');
mySS = window.sessionStorage;
//mySS.setItem("logged_in", "user_id_1");
// $.getJSON("/data/users.json", function (json) {
//     let keys = Object.keys(json);
//     for (let _i = 0; _i < keys.length; _i++) {
//         const k = keys[_i];
//         const v = JSON.stringify(json[k]);
//         mySS.setItem(k, v);

//     }
//     mySS.setItem('hosts', JSON.stringify(keys));
//     return;
// });

console.log(mySS.getItem('logged_in'))

let logged_in = "";

router.hooks({
    before: function (done, params) {
        logged_in = mySS.getItem('logged_in');
        done();
    }
})




//show functions
function showHome() {
    if (!logged_in) {
        showLogin();
    } else {
        app.innerHTML = homePageUser;
        showMap();
        let searchButton = document.getElementById('searchButton');
        searchButton.onclick = () => goToSearch();
    }

}

function showLogin() {
    app.innerHTML = loginPage
    handle_login();
}


function showSearch() {
    if (!logged_in) {
        showLogin();
    } else {
        app.innerHTML = searchPage;
        let backToHome = document.getElementById('backToHome');
        backToHome.onclick = () => goToHome();
    }
}

function showHostProfile() {
    if (!logged_in) {
        showLogin();
    } else {
        let user = get_user();
        app.innerHTML = getUserPage(user);
        _set_imgs_profile(user.pro_pric, user.bcg_pic);

        _set_events(user.events);
        adjust_header();
        adjust_profile();
        add_event_listeners_host();
    }
}

function showCreateEvent() {
    if (!logged_in) {
        showLogin();
    } else {
        app.innerHTML = get_create_page();
        add_event_listeners_create();
    }
}

function showEditEvent() {

}

function showEventHostSide(ev) {
    if (!logged_in) {
        showLogin();
    } else {
        app.innerHTML = get_host_show_event_page(ev);
        add_event_listeners_show_event_host();
    }
}

function showEventGuestSide(ev) {
    if (!logged_in) {
        showLogin();
    } else {
        let user = get_user_from_event_id(ev.id)
        app.innerHTML = get_guest_show_event(ev, user)
        _set_imgs_profile(user.pro_pric, ev.picture);
        adjust_header();
        adjust_profile();
        create_event_map(ev, user.addresses[ev.adr])
        setFavourite();
        setTags(ev.tags);


        let backToHome = document.getElementById('back');
        backToHome.onclick = () => goToHome();

        let goToPayment = document.getElementById("book")
        if (ev.max_guests != ev.actual_guests) {
            goToPayment.onclick = () => goToBooking(ev.id)
        }
        else {
            goToPayment.setAttribute("disabled", True)
            goToPayment.innerText = "Full"
        }
    }
}


function showBookingEvent(ev) {
    if (!logged_in) {
        showLogin();
    } else {
        app.innerHTML = booking_page(ev)
        setMaxGuests(ev)
        handlePayment(ev)
        let back = document.getElementById("back")
        back.onclick = () => goToShowEventGuest(ev.id)
    }
}




//go functions

function goToHome() {
    let route = '/login';
    if (logged_in) {
        route = '/home';
    }
    router.navigate(route);
    return false;
}

function goToSearch() {
    let route = '/login';
    if (logged_in) {
        route = '/search';
    }
    router.navigate(route);
    return false;
}

function goHostProfile() {
    let route = '/login';

    if (logged_in) {
        route = '/profile';

    }
    router.navigate(route);

    return false;
}

function goHostCreateEvent() {
    let route = '/login';

    if (logged_in) {
        route = '/create-event';
    }
    router.navigate(route);

    return false;
}

function goToShowEvents(ev_id) {
    let route = '/login';
    if (logged_in) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        route = `/show-event-host/${ev_id}`;
    }
    router.navigate(route);

    return false;
}

function goToShowEventGuest(ev_id) {
    let route = '/login';
    if (logged_in) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        route = `/show-event-guest/${ev_id}`;
    }
    router.navigate(route);

    return false;
}

function goToBooking(ev_id) {
    let route = '/login';
    if (logged_in) {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        route = `/book-event/${ev_id}`;
    }
    router.navigate(route);

    return false;
}


router
    .on("/home", showHome)
    .on("/login", showLogin)
    .on("/search", showSearch)
    .on("/profile", showHostProfile)
    .on("/create-event", showCreateEvent)
    .on("/edit-event", showEditEvent) //TODO
    .on("/show-event-host/:id", param => {
        let lg_user = get_user();
        let ev = lg_user.events.filter(e => e.id == param.id)[0];
        showEventHostSide(ev);
    })
    .on("/show-event-guest/:id", param => {
        let lg_user = get_user_from_event_id(param.id);
        let ev = lg_user.events.filter(e => e.id == param.id)[0];
        showEventGuestSide(ev);
    })
    .on("/book-event/:id", param => {
        let lg_user = get_user_from_event_id(param.id);
        let ev = lg_user.events.filter(e => e.id == param.id)[0];
        showBookingEvent(ev);
    })
    .on("*", showHome)
    .resolve();
