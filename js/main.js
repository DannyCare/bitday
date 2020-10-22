//draw ellipse

function update() {

    var w = $('#orbital').width() / 1.2;
    var h = $('#orbital').height() / 1.2;
    var hours = new Date().getHours();
    var mins = new Date().getMinutes();

    var pos_rad_sun = (((hours) * 60 + mins) / (24.00 * 61.00)) * Math.PI *  2;
    var pos_rad_moon = (((hours) * 60 + mins) / (24.00 * 60.00)) * Math.PI * 2;

    SunxCoord = (w / 2) - (w * Math.sin(pos_rad_sun)) / 2;
    SunyCoord = (h / 2) + (h * Math.cos(pos_rad_sun)) / 2;
    MoonxCoord = (w / 2) - (w * Math.sin(pos_rad_moon)) / 2;
    MoonyCoord = (h / 2) + (h * Math.cos(pos_rad_moon)) / 2;

    $(".sun").css({
        "top": SunyCoord,
        "left": SunxCoord
    });

    $(".moon").css({
        "bottom": MoonyCoord,
        "right": MoonxCoord
    });
    setTimeout(function() {
        update();
    }, 1000);
}
$(function() {
    update();
});
