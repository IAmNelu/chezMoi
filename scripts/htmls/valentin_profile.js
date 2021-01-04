'use strict'

function getUserPage(userObj) {
    const user = `
    <header class="main_location_pic">

    </header>

    <div class="container margin_bootom_big">
        <div class="avatar_profile"></div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="profile_name">${userObj.name} <span class="rating">${userObj.ratings}<i class="fa fa-star"
                            aria-hidden="true"></i></span></h1>
            </div>
            <div class="col-2">

            </div>
        </div>
        <article>
            <div class="row">
                <div class="col-7">
                    <h4>About ME</h4>
                </div>
                <div class="col-5 text-right">
                    <h4 onclick="sow_edit('${userObj.id}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</h4>
                </div>
            </div>
            <div id="small_description">
                <div class="row">
                    <p class="col-12">
                        ${userObj.description.slice(0, 200)}
                    </p>
                </div>
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-light" type="button" data-toggle="collapse"
                            onclick="hide_small_description()" data-target="#collapseDescription" aria-expanded="false"
                            aria-controls="showFullDescription">
                            Show More
                        </button>
                    </div>
                </div>
            </div>
            <div class="collapse" id="collapseDescription">
                <div class="row">
                    <p class="col-12">
                    ${userObj.description}
                    </p>
                </div>
                <div class="row mb-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-light" type="button" data-toggle="collapse"
                            data-target="#collapseDescription" aria-expanded="false" aria-controls="collapseDescription"
                            onclick="show_small_description()">
                            Show Less
                        </button>
                    </div>
                </div>
            </div>
        </article>
        <div id="events"></div>

    </div>
        
    
    <footer>
        <nav class="navbar-light bg-light fixed-bottom py-3">
            <div class="container">
                <div class="row">
                    <div class="col text-center"><i class="fa fa-refresh btn_ico" aria-hidden="true"></i><br>Guest
                    </div>
                    <div class="col text-center" id="add_new_event"><i class="fa fa-plus-circle btn_ico" aria-hidden="true"></i><br>Add
                        Event
                    </div>
                    <div class="col text-center"><i class="fa fa-comments-o btn_ico" aria-hidden="true"></i><br>Messages
                    </div>
                </div>
            </div>
        </nav>
    </footer>
    `
    return user
}

function getOneEvent(eventObj) {
    const event = `
    <article id="art_${eventObj.id}" class="card mb-3">
            <div class="row">
                <div class="col-6">
                    <div class="image_card" id="img_${eventObj.id}"></div>
                </div>
                <div class="col-6">
                    <h3>${eventObj.name}</h3>
                    <div class="row">
                        <p class="col-6">${eventObj.price} €</p>
                        <p class="col-6">${eventObj.actual_guests}/${eventObj.max_guests} <i class="fa fa-user" aria-hidden="true"></i></p>
                    </div>
                    <p class="incard_description">${eventObj.Description}</p>
                    <div class="row d-flex justify-content-between">
                        <span class=" col-6 incard_date align-self-center">${eventObj.date}</span>
                        <button class="col-5  mb-1 mr-2 btn btn-light align-self-center edit_btn" onclick="event.stopPropagation(); edit_event('${eventObj.id}');"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Edit</button>
                    </div>
                </div>
            </div>
        </article>`
    return event;
}

function getForm(description, id) {
    const form = `<form>
    <div class="form-group mt-3">
    <textarea class="form-control" id="form_description_area" rows="7">${description}</textarea>
    <div class="row mt-3 justify-content-between">
    <button type="button" onclick="cancel_edit()" class="btn btn-danger col-sm-5 mt-3">Cancel</button>
    <button type="button" onclick="edit_description('${id}')" class="btn btn-primary  col-sm-5 mt-3">Edit</button>
    </div>

  </div>
</form>`;
    return form;
}