window.onload = function () {
    adjust_header();
    adjust_profile();

};


function adjust_profile() {
    let prof_av = $('.avatar_profile').first();
    let w = prof_av.width();
    prof_av.height(w);
    prof_av.css('margin-top', '-60pt');

}

function adjust_header() {
    let prof_av = $('.main_location_pic').first();
    prof_av.css('height', '150pt');
}