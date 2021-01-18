function get_host_show_event_page(eventObj) {
    const event_page = `<div class="container margin_bootom_big">
    <header>
        <div class="row py-2">
            <i id="go_back" class="fa fa-arrow-left col-1 back_arrow" aria-hidden="true"></i>
            <h2 class="screen_title col-10">${eventObj.name} - €${eventObj.price}</h2>
        </div>
        <div class="row d-flex justify-content-around">
            <button id="delet_btn" class="col-5 btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>Delete</button>
            <button class="col-5 btn btn-light"><i class="fa fa-pencil-square-o"
                    aria-hidden="true"></i>Edit</button>
        </div>
    </header>
    <article>
        <div></div>
        <h4 class="mt-3">Description</h4>
        <p class="text-justify">${eventObj.Description}</p>

    </article>
    <article>
    <header class="text-center">
            <h4> Tags </h4>
        </header>
        <div class="text-center">
            <div class="row mx-2">
            ${getTags(eventObj.tags)}
            </div>
        </div>
    </article>
    <div class="row d-flex justify-content-around">
        <article class="col-5">
            <h4 class="mt-3">When</h4>
            <p class="text-justify">${eventObj.date}</p>

        </article>
        <article class="col-5">
            <h4 class="mt-3">Who</h4>
            <p class="text-justify">${eventObj.actual_guests}/${eventObj.max_guests}</p>
        </article>
    </div>
    <div class="row d-flex justify-content-around">
        <article class="col-11">
        <header class="text-center">
        <h4> Where is it?</h4>
    </header>
            <div id="mapid_h"></div>
        </article>
    </div>

    <footer>
        <nav class="navbar-light bg-light fixed-bottom py-3">
            <div class="container">
                <div class="row">
                    <div class="col text-center" id="become_guest"><i class="fa fa-refresh btn_ico" aria-hidden="true"></i><br>Guest
                    </div>
                    <div class="col text-center" id="add_new_event"><i class="fa fa-plus-circle btn_ico" aria-hidden="true"></i><br>Add
                        Event
                    </div>
                    <div class="col text-center"><i class="fa fa-comments-o btn_ico"
                            aria-hidden="true"></i><br>Messages
                    </div>
                </div>
            </div>
        </nav>
    </footer>`;
    return event_page;
}

function add_event_listeners_show_event_host(user, event_id, ss) {
    $('#add_new_event').click(goHostCreateEvent);
    $('#go_back').click(() => router.navigate('/profile'));
    $('#delet_btn').click(() => {
        user.events = user.events.filter(e => e.id != event_id)
        ss.setItem(user.id, JSON.stringify(user));
        router.navigate('/profile')
    })
    $('#become_guest').click(_ => {
        goToHome();
    });
}

function getTags(tag_list) {
    let ret = "";
    for (let _i = 0; _i < tag_list.length; _i++) {
        const tag = tag_list[_i];
        let new_tag = '<div class="col-6 text-left">' + tag + "</div>"
        ret += new_tag;
    }
    return ret;

}


function create_event_map_h(ev, adr) {
    let ww = $(window).width();
    $('#mapid_h').width(ww);
    $('#mapid_h').height(ww);

    var map = L.map('mapid_h').setView([adr.lat, adr.long], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var chicken = L.marker([adr.lat, adr.long]).addTo(map);

    chicken.bindPopup(`<img alt="eventPitct" src="${ev.picture}" class="w-100"><br><br><b>${ev.name}</b>`)
        .openPopup();

    $('#mapid_h').width(ww * 0.8);
    $('#mapid_h').height(ww * 0.8);
}