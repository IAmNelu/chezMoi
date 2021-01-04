function get_show_event_page(eventObj) {
    const event_page = `<div class="container margin_bootom_big">
    <header>
        <div class="row py-2">
            <i class="fa fa-arrow-left col-1 back_arrow" aria-hidden="true"></i>
            <h2 class="screen_title col-10">${eventObj.name}</h2>
        </div>
        <div class="row d-flex justify-content-around">
            <button class="col-5 btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>Delete</button>
            <button class="col-5 btn btn-light"><i class="fa fa-pencil-square-o"
                    aria-hidden="true"></i>Edit</button>
        </div>
    </header>
    <article>
        <div></div>
        <h4 class="mt-3">Description</h4>
        <p class="text-justify">${eventObj.Description}</p>
        <h5>Tags</h5>
        <ul class="pl-5">
            <li>Schifo</li>
            <li>Bello</li>
            <li>Carne</li>
        </ul>
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
            <h4 class="mt-3">Where</h4>
            <div style="width: 100%;height: 350px;background-color: aquamarine;">
                MAPPA
            </div>
        </article>
    </div>

    <footer>
        <nav class="navbar-light bg-light fixed-bottom py-3">
            <div class="container">
                <div class="row">
                    <div class="col text-center"><i class="fa fa-refresh btn_ico" aria-hidden="true"></i><br>Guest
                    </div>
                    <div class="col text-center"><i class="fa fa-plus-circle btn_ico" aria-hidden="true"></i><br>Add
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