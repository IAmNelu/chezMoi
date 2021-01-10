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
          
          <div>Special needs</div>
          <div class="form-check">
            <div class="row">
              <span class="col-1">
                <input class="form-check-input" type="checkbox" value="" id="meat">
              </span>
              <span class="col-6">
                <label class="form-check-label" for="meat">Meat</label>
              </span>
            </div>
          </div>
            <div class="form-check">
              <div class="row">
                <span class="col-1">
                  <input class="form-check-input" type="checkbox" value="" id="fish">
                </span>
                <span class="col-6">
                  <label class="form-check-label" for="fish">Fish</label>
                </span>
              </div>
            </div>
            <div class="form-check">
              <div class="row">
                <span class="col-1">
                  <input class="form-check-input" type="checkbox" value="" id="bio">
                </span>
                <span class="col-6">
                  <label class="form-check-label" for="bio">Bio</label>
                </span>
              </div>
            </div>
            <div class="form-check">
              <div class="row">
                <span class="col-1">
                  <input class="form-check-input" type="checkbox" value="" id="gluten-free">
                </span>
                <span class="col-6">
                  <label class="form-check-label" for="gluten-free">Gluten Free</label>
                </span>
              </div>
            </div>
          </div>
            
            <nav class="navbar-light bg-light fixed-bottom">
                <div class="container">
                    <div class="row float-right">
                        <button type="submit" class="btn btn-primary m-3">Search</button>
                    </div>
                </div>
            </nav>
        </form>
    </section>`;

function submitSearch(){
  console.log('searchForm submitted');
  let searchForm = document.getElementById('searchForm');
  let radius = searchForm.elements["radius"].value;
  let ratings = searchForm.elements["ratings"].value;
  let maxPrice = searchForm.elements["maxPrice"].value;
  let guests = searchForm.elements["guests"].value;
  let date = searchForm.elements["searchDateInput"].value;
  let hour = searchForm.elements["searchTimeInput"].value;
  let meatChecked = null;
  if ( searchForm.elements["meat"].checked ){
    meatChecked = "meat";
  }
  let fishChecked = null;
  if ( searchForm.elements["fish"].checked ){
    fishChecked = "fish";
  }
  let bioChecked = null;
  if ( searchForm.elements["bio"].checked ){
    bioChecked = "bio";
  }
  let glutenChecked = null;
  if ( searchForm.elements["gluten-free"].checked ){
    glutenChecked = "gluten-free";
  }

  var conditions = {
    "rating" : ratings,
    "max_price" : maxPrice,
    "guest_num": guests,
    "date": date,
    "hour": hour,
    "radius": radius,
    "tags": [
      meatChecked,
      fishChecked,
      bioChecked,
      glutenChecked
    ]
  }
  mySS.setItem('conditions', JSON.stringify(conditions));
  console.log(conditions)
  goToHome();
}