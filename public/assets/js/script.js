$(document).ready(function() {
    $(window).resize(function() {
        var bodyheight = $(this).height()-300;;
        $("#articles").height(bodyheight);
    }).resize();
});