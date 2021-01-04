function get_create_page() {
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
                        placeholder="How would you like to call your event?">
                </div>
                <div class="row mt-2">
                    <label for="EventDescriptionInput">Description</label>
                </div>
                <div class="row">
                    <textarea rows="7" type="text" name="EventDecription" id="EventDescriptionInput"
                        placeholder="Please add a description to your event"></textarea>
                </div>
                <div class="row mt-3">
                    <label for="EventPriceInput" class="col-7">Price</label>
                    <input class="col-4" type="number" min="0" name="EventPrice" id="EventPriceInput">
                    <label for="EventPriceInput" class="col-1">€</label>
                </div>
                <div class="row mt-3">
                    <label for="EventGuestsInput" class="col-7">Max Number of Guests</label>
                    <input placeholder="1" class="col-4" type="number" min="1" name="EventGuests"
                        id="EventGuestsInput">
                </div>

                <div class="row">
                    <p>Tags:</p>

                </div>
                <div class="tags">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="check_vegetarian">
                        <label class="form-check-label" for="check_vegetarian">
                            Vegetarian
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="check_vegan">
                        <label class="form-check-label" for="check_vegan">
                            Vegan
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="check_no_nut">
                        <label class="form-check-label" for="check_no_nut">
                            Nut allergy
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="check_shell">
                        <label class="form-check-label" for="check_shell">
                            Shellfish allergy
                        </label>
                    </div>
                </div>
                <div class="row mt-3">
                    <label for="chose_picture">Chose and add a picture</label>
                    <input type="file" class="form-control-file" id="chose_picture">
                </div>
            </div>
            <div class="row justify-content-center">
                <button id="btn_create_event" type="button" class="btn btn-primary col-sm-6">Crete Event</button>
            </div>
        </form>
    </header>

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
    </footer>`
    return page;
}
