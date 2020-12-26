'use strict';

function showMap(){    
    var map = L.map('mapid').setView([51.505, -0.11], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var cooking_mama = L.marker([51.5, -0.09]).addTo(map);
    
    var you = L.marker([51.508, -0.11]).addTo(map);
    
    cooking_mama.bindPopup('<img src="images/profile_cooking_mama.png" class="w-100"><br><br><b>Cooking mama</b>')
        .openPopup();
    
    you.bindPopup('<i class="fa fa-user-circle-o btn_ico" aria-hidden="true"></i><br><br><b>You are here</b>')
        .openPopup();
}

function showHomePage() {
    app.innerHTML = homePage;
    showMap();
    let searchButton = document.getElementById('searchButton');
    searchButton.onclick = () => goToSearch();
}

function showSearch() {
    app.innerHTML = searchPage;
    let backToHome = document.getElementById('backToHome');
    backToHome.onclick = () => goToHome(); 
}

function showLogin() {
    app.innerHTML = loginPage;
    let loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = () => goToHome(); 
}

function goToHome(){
    let route = '/home';
    router.navigate(route);
    return false;
}

function goToSearch(){
    let route = '/search';
    router.navigate(route);
    return false;
}

const router = new Navigo(null, true, '#!');

router
    .on("/home", showHomePage)
    .on("/search", showSearch)
    .on("/login", showLogin)
    .on("*", showLogin)
    .resolve();
