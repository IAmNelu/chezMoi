function get_create_page(user) {
    const page = `<div class="container margin_bootom_big">
    <header>
        <div class="row py-2">
            <i id="go_back" class="fa fa-arrow-left col-1 back_arrow" aria-hidden="true"></i>
            <h2 class="screen_title col-10">Create Your Event</h2>
        </div>
        <form id="_create_event_form">
            <div class="form-group">
                <div class="row mt-2">
                    <label for="EventNameInput">Name</label>
                </div>
                <div class="row mt-2">
                    <input type="text" name="EventName" id="EventNameInput"
                        placeholder="How would you like to call your event?" required>
                </div>
                <div class="row mt-2">
                    <label for="EventDescriptionInput">Description</label>
                </div>
                <div class="row">
                    <textarea rows="4" name="EventDecription" id="EventDescriptionInput"
                        placeholder="Please add a description to your event" required></textarea>
                </div>
                <div class="row mt-3">
                    <label for="EventPriceInput" class="col-7">Price</label>
                    <input class="col-4" type="number" min="0" name="EventPrice" id="EventPriceInput" required>
                    <label for="EventPriceInput" class="col-1">€</label>
                </div>
                <div class="row mt-3">
                    <label for="EventGuestsInput" class="col-7">Max Number of Guests</label>
                    <input placeholder="1" class="col-4" type="number" min="1" name="EventGuests"
                        id="EventGuestsInput" required>
                </div>

                <div class="row mt-3">
                <label for="EventTimeInput" class="col-12">When</label>
                </div>
                <div class="row d-flex justify-content-around" id="time_event">
                    <input class="col-5" type="time" name="EventTime" id="EventTimeInput" required>
                    <input class="col-6" type="date" name="EventDate" id="EventDateInput" required>
                </div>
                <div class="row  mt-3">
                <p>Where</p>
                </div>
                <div class="tags_create">
                 ${getRadioPositions(user.addresses)}
                </div>
                <div class="row  mt-3">
                    <p>Tags:</p>
                </div>
                <div class="tags_create">
                    ${getDropDwonTags(tags_global)}
                </div>
                <div class="row mt-3">
                    <label for="chose_picture">Chose and add a picture</label>
                    <input type="file" class="form-control-file" id="chose_picture">
                </div>
            </div>
            <div class="row justify-content-center">
                <button id="btn_create_event" type="button" class="btn btn-primary col-sm-6">Create Event</button>
            </div>
        </form>
    </header>

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
    </footer>`
    return page;
}

function add_event_listeners_create(user) {
    $('#become_guest').click(_ => {
        goToHome();
    });
    $('#add_new_event').click(_ => {
        _add_event_function(user);
    });
    $('#go_back').click(goHostProfile);
    $("#btn_create_event").click(() => {
        _add_event_function(user);
    });
    eventsTags();
}

function _add_event_function(user) {
    let form = document.forms["_create_event_form"];
    var now_date = new Date();

    if (form.checkValidity()) {

        let date_cs = form["EventDateInput"].value.split('-');
        let time_cs = form["EventTimeInput"].value.split(':');
        let ev_date = new Date(date_cs[0], date_cs[1] - 1, date_cs[2]);
        ev_date.setHours(time_cs[0]);
        ev_date.setMinutes(time_cs[1]);
        if (ev_date <= now_date) {
            alert("You cannot schedule an event before the current time");
        } else {
            let last_id_p = user.events[user.events.length - 1].id.split('__');
            let new_ev_id = [last_id_p[0].split('_')[0] + '_' + (parseInt(last_id_p[0].split('_')[1]) + 1)]
            let new_id = new_ev_id.concat(last_id_p.slice(1)).join('__');
            let adr_key = $('input[name=adress_selection]:checked', '#_create_event_form').val();
            let tags = get_selected_tag();

            new_ev = {
                "id": new_id,
                "name": form["EventNameInput"].value,
                "price": form["EventPriceInput"].value,
                "max_guests": form["EventGuestsInput"].value,
                "actual_guests": 0,
                "Description": form["EventDescriptionInput"].value,
                "date": date_cs[2] + '/' + date_cs[1] + '/' + date_cs[0],
                "hour": form["EventTimeInput"].value,
                "adr": adr_key,
                "picture": "../images/paceholder.png",
                "tags": tags
            }
            user.events.push(new_ev);
            updateUser(user)
            goHostProfile();
        }
    } else {
        alert("missing Fields");
    }
}

function eventsTags() {
    $(".tags_item_drop").each(function (index) {
        $(this).click(function (ev) {
            $(this).addClass("select");
            refresDropDown();
            addCheck();
        });
    });

}

function getRadioPositions(adrOBJ) {
    let radioHTML = '<div class="input-group" id="radio_adresses">'

    let ks = Object.keys(adrOBJ);
    for (let _i = 0; _i < ks.length; _i++) {
        const k = ks[_i];
        let adr = adrOBJ[k].full_address;
        radioHTML += `<div class="input-group-prepend">
        <div class="input-group-text">
            <input type="radio" name="adress_selection" value="${k}" id="radio_${k}">
        </div>
        </div>
        <label class="form-control" for="radio_${k}">${adr}</laber>`
    }
    radioHTML += "</div>"
    return radioHTML
}

function getDropDwonTags(tags) {
    let dropDownHtml =
        `<div id="tag_selector"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
            Select Tags
        </button>
    <div class="dropdown-menu" id="dropdown-tags"><div id="not_selected">`;
    for (let _i = 0; _i < tags.length; _i++) {
        let single_tag = ` <p class="dropdown-item tags_item_drop "id ="tag__${tags[_i]}">${tags[_i]}</p>`;
        dropDownHtml += single_tag;
    }
    dropDownHtml += `</div><div class="dropdown-divider"></div><div id="selected"></div></div></div><div id="selected_check"></div>`;
    return dropDownHtml;
}

function refresDropDown() {
    let tmp = $('#not_selected .select').first().detach();
    $('#selected').append(tmp);
    tmp.removeClass('select');
}

function addCheck() {
    let tag = `<div class="seleced_checks">`;
    $('#selected').children().each(index => {
        let val = $('#selected').children()[index].innerHTML
        tag += `<div class="selected_checks"><i class="fa fa-times" aria-hidden="true"></i><span>${val}</span></div>`;
    })
    tag += "</div>"
    $('#selected_check').html(tag);
    $('.selected_checks i').click(ev => {
        let to_rem = $(ev.target).parent().detach();
        let name_to_move = $(ev.target).next().html();
        let tmp = $(`#selected #tag__${name_to_move}`).detach();
        $('#not_selected').append(tmp);
    });
}

function get_selected_tag() {
    let result = [];
    $('#selected').children().each(index => {
        result.push($('#selected').children()[index].innerHTML)
    });
    result.sort();
    return result
}


let tags_global = ["meat",
    "fish",
    "vegetarian",
    "vegan",
    "gluten-free",
    "bio",
    "breakfast",
    "lunch",
    "dinner",
]
