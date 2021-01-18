'use strict'

const loginPage = `
<div class="row justify-content-center">
    <div class="col-12 my-5 text-center">
        <img src="images/logo.png" class="img-fluid" alt="logo">
    </div>
</div>
    
    <section class="m-5 justify-content-center">
        <form class="" id="loginForm">

          <div class="row justify-content-center my-4">
            <div class="form-group text-center">
              <label for="usr">username</label>
              <input type="text" class="form-control" id="usr" placeholder="your username" required>
            </div>
          </div> 

          <div class="row justify-content-center my-4">
            <div class="form-group text-center">
              <label for="pw">password</label>
              <input type="password" class="form-control" id="pw" placeholder="your password" required>
            </div>
          </div> 

          <div class="row justify-content-center my-4">
            <div>You are not subscribed? <u id="subscribe">Subscribe now</u></div>
          </div> 

          <div class="row justify-content-center my-4">
            <div class="float-right">
                <button type="submit" id="log_in" class="btn btn-primary m-3">Log in</button>
            </div>
          </div> 

        </form>
    </section>`;