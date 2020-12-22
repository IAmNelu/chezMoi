'use strict';

function showChiSiamo() {
    app.innerHTML = chiSiamoPage;
}

function showFornitori() {
    app.innerHTML = fornitoriPage;

    var mymap = L.map('mapid').setView([40.554373, 17.723833], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidmluY2Vuem9tYWRhZ2hpZWxlIiwiYSI6ImNqczhtcjV6YjE4eWg0OXJuM2JnZzU4em4ifQ._8yVH3z-n0_z0Hu2Bu82Yg'
    }).addTo(mymap);

    var marker = L.marker([40.557703, 17.695358]).addTo(mymap);
    marker.bindPopup('<img src="img/guarino.jpeg" class="w-100"><br><br><b>Masseria di Guarino</b>').openPopup();

    var marker2 = L.marker([40.568852, 17.723019]).addTo(mymap);
    marker2.bindPopup('<img src="img/formaggio.jpg" class="w-100"><br><br><b>Masseria del formaggio</b>').openPopup();
}

function submitForm(form) {
    form.classList.add('was-validated');
}

function showSpecialita() {
    app.innerHTML = specialita;
}

function showGallery() {
    app.innerHTML = gallery;
}

function showContattaci() {
    app.innerHTML = contattaciPage;

    var mymap = L.map('mapid').setView([40.550128, 17.718429], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidmluY2Vuem9tYWRhZ2hpZWxlIiwiYSI6ImNqczhtcjV6YjE4eWg0OXJuM2JnZzU4em4ifQ._8yVH3z-n0_z0Hu2Bu82Yg'
    }).addTo(mymap);

    var marker = L.marker([40.550128, 17.718429]).addTo(mymap);
    marker.bindPopup('<img src="img/esterno.jpg" class="w-100"><br><br><b>Macelleria Madaghiele</b><p>via Torre S.S., 79</p>').openPopup();
}

function gotoSpecialita() {
    let route = '/specialita';
    router.navigate(route);
    return false;
}

function showHomePage() {
    app.innerHTML = homePage;
    let card1 = document.getElementById('carneBattuta');
    let card2 = document.getElementById('salame');
    let card3 = document.getElementById('carneScelta');

    card1.onclick = () => gotoSpecialita();
    card2.onclick = () => gotoSpecialita();
    card3.onclick = () => gotoSpecialita();
}

const router = new Navigo(null, true, '#!');

router
    .on("/chisiamo", showChiSiamo)
    .on("/fornitori", showFornitori)
    .on("/specialita", showSpecialita)
    .on("/gallery", showGallery)
    .on("/contatti", showContattaci)
    .on("*", showHomePage)
    .resolve();
