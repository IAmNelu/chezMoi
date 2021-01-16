const router = new Navigo('/', true, '#!');
mySS = window.sessionStorage;
let obj = {
    "id": "user_id_1",
    "name": "Cooking MAMA",
    "ratings": 4.9,
    "n_ratings": 20,
    "pro_pric": "../images/profile_cooking_mama.png",
    "bcg_pic": "../images/app_cooking_mama.jpg",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui suscipit reiciendis at possimus blanditiis soluta, maiores est, placeat praesentium, omnis ut minima vero. Animi explicabo cum sit iusto laborum vel eius libero eos ipsa aliquam harum amet, minima, iure pariatur nostrum nihil consequuntur, enim debitis similique. Quam quidem, culpa ipsa assumenda explicabo numquam reprehenderit asperiores recusandae soluta, fugiat iste hic. Nisi obcaecati iusto explicabo atque illo labore eligendi asperiores repellendus? Suscipit veniam, non deserunt labore sed voluptate, id quam consequuntur illo in sit libero quae reprehenderit sunt? Deserunt, soluta repellendus corrupti fugiat ea doloremque. Commodi iusto alias fugit laborum facere.",
    "addresses": {
        "adr1": {
            "lat": 40.552,
            "long": 17.710,
            "full_address": "221b, Baker Street"
        }
    },
    "events": [
        {
            "id": "ev_0__event_cooking_mama_events__user_id_1",
            "name": "Chicken",
            "price": 10,
            "max_guests": 6,
            "actual_guests": 4,
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, architecto?",
            "date": "01/01/2021",
            "hour": "12:00",
            "adr": "adr1",
            "picture": "../images/chicken_meal.jpg",
            "tags": [
                "meat",
                "lunch",
                "gluten-free",
                "bio"
            ]
        },
        {
            "id": "ev_1__event_cooking_mama_events__user_id_1",
            "name": "Fish",
            "price": 15,
            "max_guests": 8,
            "actual_guests": 1,
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, architecto?,",
            "date": "01/01/2021",
            "hour": "18:00",
            "adr": "adr1",
            "picture": "../images/fish_meal.png",
            "tags": [
                "gluten-free",
                "bio",
                "fish"
            ]
        }
    ]
}
if (!mySS.getItem('user_id_1')) mySS.setItem('user_id_1', JSON.stringify(obj));
mySS.setItem('hosts', JSON.stringify(["user_id_1"]));
// mySS.setItem("logged_in", "user_id_1");
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

function updateUser(user) {
    mySS.setItem(user.id, JSON.stringify(user));
}


//show functions
function showHome() {
    if (!logged_in) {
        showLogin();
    } else {
        app.innerHTML = homePageUser;
        showMap();
        let events = get_events_guests();
        _set_events_guest(events);
        // let searchButton = document.getElementById('searchButton');
        // searchButton.onclick = () => goToSearch();
        // let wordSearchForm = document.getElementById('wordSearchForm');
        // wordSearchForm.onsubmit = () => searchWordSubmit();
        // let goToProfile = document.getElementById('goToProfile');
        // goToProfile.onclick = () => handleGoToProfile();
        add_event_listeners_search_simple();
    }
}

function showLogin() {

    app.innerHTML = loginPage
    handle_login();
}

function showHostLogin() {
    if (!logged_in) {
        goToLogin()
    } else {
        app.innerHTML = hostLoginPage;
        let loginAsUser = document.getElementById('loginAsUser');
        loginAsUser.onclick = () => goToHome();
        let loginAsHost = document.getElementById('loginAsHost');
        loginAsHost.onclick = () => goHostProfile();
    }
}

function showSearch() {
    if (!logged_in) {
        goToLogin()
    } else {
        app.innerHTML = searchPage;
        initializeTags();
        let backToHome = document.getElementById('backToHome');
        backToHome.onclick = () => goToHome();
        // let searchForm = document.getElementById('searchForm');
        // searchForm.onsubmit = () => submitSearch();
        add_event_listeners_search_complex();
    }
}

function showHostProfile() {
    if (!logged_in) {
        goToLogin()
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

function showHostProfile_g(host) {
    if (!logged_in) {
        goToLogin()
    } else {
        app.innerHTML = getUserPage_Guest(host);
        _set_imgs_profile_g(host.pro_pric, host.bcg_pic);
        _set_events_g(host.events);
        adjust_header();
        adjust_profile();
        handle_rate(host.id);

        let backToHome = document.getElementById('back');
        backToHome.onclick = () => goToHome();

        let back2 = document.getElementById('up');
        back2.onclick = () => goToHome();
    }
}

function showCreateEvent() {
    if (!logged_in) {
        goToLogin()
    } else {
        let user = get_user();
        app.innerHTML = get_create_page(user);
        add_event_listeners_create(user);
    }
}

function showEditEvent() {

}

function showEventHostSide(ev) {
    if (!logged_in) {
        goToLogin();
    } else {
        let user = get_user_from_event_id(ev.id)
        app.innerHTML = get_host_show_event_page(ev);
        add_event_listeners_show_event_host(user, ev.id, mySS);
        create_event_map_h(ev, user.addresses[ev.adr]);
    }
}

function showEventGuestSide(ev) {
    if (!logged_in) {
        goToLogin()
    } else {
        let user = get_user_from_event_id(ev.id)
        app.innerHTML = get_guest_show_event(ev, user)
        _set_imgs_event(user.pro_pric, ev.picture)
        adjust_header();
        adjust_profile_g();
        create_event_map(ev, user.addresses[ev.adr])
        setFavourite();
        setTags(ev.tags);


        let backToHome = document.getElementById('back');
        backToHome.onclick = () => goToHome();

        let imgToProfile = document.getElementById("img_profile")
        imgToProfile.onclick = () => goShowProfile(user.id)


        let goToPayment = document.getElementById("book")
        if (ev.max_guests != ev.actual_guests) {
            goToPayment.onclick = () => goToBooking(ev.id)
        }
        else {
            goToPayment.classList.add("disable")
            goToPayment.innerHTML = '<i class="fa fa-sign-in btn_ico" aria-hidden="true"></i><br>Full</div>'
        }
    }
}


function showBookingEvent(ev) {
    if (!logged_in) {
        goToLogin()
    } else {
        app.innerHTML = booking_page(ev)
        setMaxGuests(ev)
        handlePayment(ev)
        let back = document.getElementById("back")
        back.onclick = () => goToShowEventGuest(ev.id)
    }
}




//go functions
function goToLogin() {
    let route = "/login"
    router.navigate(route)
}

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

function goToHostLogin() {
    let route = '/login';
    if (logged_in) {
        route = '/hostLogin';
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

function goShowProfile(host_id) {
    let route = '/login';

    if (logged_in && logged_in == host_id) {
        route = '/profile';
    }
    else if (logged_in) {
        route = `/profile/${host_id}`
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
    .on("/hostLogin", showHostLogin)
    .on("/search", showSearch)
    .on("/profile", showHostProfile)
    .on("/profile/:id", param => showHostProfile_g(JSON.parse(mySS.getItem(param.id))))
    .on("/create-event", showCreateEvent)
    .on("/edit-event", showEditEvent) //TODO
    .on("/show-event-host/:id", param => {
        let lg_user = get_user();
        let ev = lg_user.events.filter(e => e.id == param.id)[0];
        showEventHostSide(ev);
    })
    .on("/show-event-guest/:id", param => {
        let event_user = get_user_from_event_id(param.id);
        let ev = event_user.events.filter(e => e.id == param.id)[0];
        showEventGuestSide(ev);
    })
    .on("/book-event/:id", param => {
        let event_user = get_user_from_event_id(param.id);
        let ev = event_user.events.filter(e => e.id == param.id)[0];
        showBookingEvent(ev);
    })
    .on("*", showHome)
    .resolve();
