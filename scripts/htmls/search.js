'use strict'

const searchPage = `
    <nav class="navbar navbar-light bg-light">
      <div class="m-2" id="backToHome">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </div>
    </nav>
    
    <section class="m-3">
        <form class="m-2" id="searchForm">

        <div class="container margin_bootom_big">

          <div class="form-group">
            <div class="row">
              <span class="col-6">
                <label for="wordToSearchSpecific" class="">Search by word</label>
              </span>
              <span class="col-6">
                <input type="string" class="form-control" id="wordToSearchSpecific" placeholder="What to eat?">
              </span>
            </div> 
          </div>

          <div class="container margin_bootom_big">
            <div class="form-group">
              <div class="row">
                <span class="col-6">
                  <label for="radius" class="">Radius</label>
                </span>
                <span class="col-6">
                  <input type="number" class="form-control" id="radius" placeholder="500 meters">
                </span>
              </div> 
            </div>


          <div class="form-group">
            <div class="row">
              <span class="col-6">
                <label for="ratings" class="">Ratings</label>
              </span>
              <span class="col-6">
                <select class="form-control" id="ratings">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </span>
            </div> 
          </div>

          <div class="form-group">
            <div class="row">
              <span class="col-6">
                <label for="maxPrice">Maximum price</label>
              </span>
              <span class="col-6">
                <input type="number" class="form-control" id="maxPrice" placeholder="30€">
              </span>
            </div> 
          </div>


          <div class="form-group">
            <div class="row">
            <span class="col-6">
              <label for="guests">Guests</label>
            </span>
            <span class="col-6">
              <input type="number" class="form-control" id="guests" placeholder="number of guests">
            </span>
            </div>
          </div>


          <div class="form-group row">
            <label for="time_event" class="col-12">Maximum Date</label>
            <input class="col-5" type="time" name="searchTime" id="searchTimeInput">
            <input class="col-6" type="date" name="searchDate" id="searchDateInput">
          </div>
          
          <div>Tags</div>
          <div id="tagsContainer"></div> 
            
            <nav class="navbar-light bg-light fixed-bottom">
                <div class="container">
                    <div class="row float-right">
                        <button type="submit" id="search_button_complex" class="btn btn-primary m-3">Search</button>
                    </div>
                </div>
            </nav>
        </form>
    </section>`;

function submitSearch() {
    let searchForm = document.getElementById('searchForm');

    if (searchForm.checkValidity()) {
        let wordToSearchSpecific = searchForm.elements["wordToSearchSpecific"].value;
        let radius = searchForm.elements["radius"].value;
        let ratings = searchForm.elements["ratings"].value;
        let maxPrice = searchForm.elements["maxPrice"].value;
        let guests = searchForm.elements["guests"].value;
        let date = searchForm.elements["searchDateInput"].value;
        let hour = searchForm.elements["searchTimeInput"].value;

        let checkedTags = [];
        for (var j = 0; j < tags_global.length; j++) {
            if (searchForm.elements[tags_global[j]].checked) {
                checkedTags.push(tags_global[j]);
            }
        }

        var conditions = {
            "rating": ratings,
            "max_price": maxPrice,
            "guest_num": guests,
            "date": date,
            "hour": hour,
            "radius": radius,
            "tags": checkedTags
        }

        mySS.setItem('conditions', JSON.stringify(conditions));
        if (wordToSearchSpecific) {
            mySS.setItem('searchWord', (wordToSearchSpecific));
        }
        goToHome();
    }
}

function initializeTags() {
    let tagsContainer = document.getElementById('tagsContainer');
    for (var j = 0; j < tags_global.length; j++) {
        var tag = tags_global[j];
        var newTag = document.createElement('div');
        let tagCheckBox = `
          <div class="form-check">
            <div class="row">
              <span class="col-1"></span>
              <span class="col-1">
                <input class="form-check-input" type="checkbox" value="" id="` + String(tag) + `">
              </span>
              <span class="col-6">
                <label class="form-check-label" for="` + String(tag) + `">` + String(tag) + `</label>
              </span>
            </div>
          </div>`;
        newTag.innerHTML = tagCheckBox;
        tagsContainer.appendChild(newTag);
    }
}

function add_event_listeners_search_complex() {
    let form = document.forms["searchForm"];
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
    })
    $('#search_button_complex').click(ev => {
        submitSearch();
    });
}