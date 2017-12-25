$(document).ready(function () {
    event.preventDefault();
    $(window).resize(function () {
        var bodyheight = $(this).height() - 300;;
        $("#articles").height(bodyheight);
    }).resize();
    $(".heading").on("click", function () {
        var notes = {id: $(this).attr("data-id")};
        console.log(notes);
        $("#articles").css({'width':'60%'});
        showNotes(notes);

    })
    $("body").on("click", "button" ,function () {
        event.preventDefault();

        switch (this.id) {
            case "btnHome":
                console.log("btnHome");
                window.location.href = "/";
                break;
            case "btnRefresh":
                console.log("btnRefresh");
                $.ajax({
                        method: "GET",
                        url: "/api/refresh/"
                    })
                    .done((data) => {
                        $("#spanStatus").html("Data Refreshed")
                    })
                break;
            case "addNote":
                console.log("addNote",this);
                break;
            case "delArticle":
                console.log($(this).parent);
                $.ajax({
                        method: "DELETE",
                        url: "api/article/" + $(this).attr("data-id")
                    })
                    .done((data) => {
                        $("#spanStatus").html("Article Deleted");

                    });
                break;
            default:
                console.log("unknown button =>", this);

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

function showNotes(notes){
    var form = $('<form>');
    
    form.append('<div class="container"><div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title"><a data-toggle="collapse" href="#collapse1">Click here to Add new note</a></h3></div><div class="panel-collapse collapse" id="collapse1"><div class="panel-body"><div class="form-group"><label for="noteTitle">Title</label><textarea class="form-control" id="noteTitle" rows="1"></textarea></div><div class="form-group"><label for="noteData">Content</label><textarea class="form-control" id="noteData" rows="3"></textarea></div><button type="button" class="btn btn-default" id="addNote">Submit</button>')

    $("#notes").html(form);
}

        // $.ajax({
        //         method: "GET",
        //         url: "api/article/" + $(this).attr("data-id")
        //     })
        //     .done((data) => {
        //         console.log(data);
        //     })