window.onload = function () {
    adjust_header();
    adjust_profile();

};

window.onresize = function () {
    adjust_header();
    adjust_profile();
}

function adjust_profile() {
    let prof_av = $('.avatar_profile').first();
    let w = prof_av.width();
    prof_av.height(w);
    if (window.innerHeight > window.innerWidth) {
        //portrait
        prof_av.css('margin-top', '-6em');
    } else {
        prof_av.css('margin-top', '-16em');
    }


}

function adjust_header() {
    let prof_av = $('.main_location_pic').first();
    if (window.innerHeight > window.innerWidth) {
        //portrait
        prof_av.css('height', '12em');
    }
    else {//landscape
        prof_av.css('height', '32em');
    }

}

function hide_small_description() {
    $('#small_description').hide();
}

function show_small_description() {
    $('#small_description').show();
}
