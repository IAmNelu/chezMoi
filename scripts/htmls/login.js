'use strict'

const loginPage = `
    <!-- Search bar -->
    <div class="d-flex justify-content-center mt-5 mb-5 m-3">
        <img src="images/logo.png" class="col-10">
    </div>
    
    <section class="m-5 justify-content-center">
        <form class="" id="loginForm">
          <div class="form-group text-center justify-content-center col-10">
            <label for="usr">username</label>
            <input type="text" class="form-control" id="usr" placeholder="your username" required>
          </div>
          <div class="form-group text-center justify-content-center col-10">
            <label for="pw">password</label>
            <input type="password" class="form-control" id="pw" placeholder="your password" required>
          </div>
            
        <div>You are not subscribed? <u id="subscribe">Subscribe now</u></div>
        <div class="float-right">
            <button type="submit" id="log_in" class="btn btn-primary m-3">Log in</button>
        </div>
        </form>
    </section>`;