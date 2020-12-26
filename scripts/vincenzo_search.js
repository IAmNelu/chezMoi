'use strict'

const searchPage = `<header class="mb-10">
        <nav class="navbar-light bg-light py-3">
            <div class="container">
                <div class="row">
                    <div class="col-3 m-2" id="backToHome"><i class="fa fa-arrow-left" aria-hidden="true"></i></div>
                </div>
            </div>
        </nav>
    </header>
    
    <section class="m-3">
        <form class="m-2">
          <div class="form-group row">
            <label for="radius" class="col-6">Radius</label>
            <input type="number" class="form-control col-5" id="radius" placeholder="500 meters">
          </div>
          <div class="form-group row">
            <label for="ratings" class="col-6">Ratings</label>
            <select class="form-control col-5" id="ratings">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
            <div class="form-group row">
            <label for="maxPrice" class="col-6">Maximum price</label>
            <input type="number" class="form-control col-5" id="maxPrice" placeholder="30€">
          </div>
            <div class="form-group row">
            <label for="guests" class="col-6">Guests</label>
            <input type="number" class="form-control col-5" id="guests" placeholder="number of guests">
          </div>
          <div>Special needs</div>
          <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Vegetarian
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Vegan
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Nut allergy
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label" for="defaultCheck1">
                Shellfish allergy
              </label>
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