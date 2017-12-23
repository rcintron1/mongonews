$(document).ready(function () {
    $(window).resize(function () {
        var bodyheight = $(this).height() - 300;;
        $("#articles").height(bodyheight);
    }).resize();
    $("button").on("click", function () {
        event.preventDefault();
        console.log(this.id);
        switch (this.id) {
            case "loadHome":
                console.log("loadHome");
                window.location.href = "/";
                break;
            default:
                console.log("unknown button");

        };
    });
})


function filterTable(callback) {
    var filterValue = $("#inputsearch").val();
    console.log(filterValue);
    if (filterValue) {
        $('td:first-child').parent('tr:not(:contains("' + filterValue + '"))').hide();
    } else {
        $('tr').show();
    }
}