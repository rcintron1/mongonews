$(document).ready(function () {
    event.preventDefault();
    $(window).resize(function () {
        var bodyheight = $(this).height() - 200;;
        $("#articles").height(bodyheight);
    }).resize();
    $("body").on("click", "button", function () {
        event.preventDefault();
        var btnId = this.id;
        var articleId = $(this).attr("data-id");
        console.log("onclick", articleId);
        switch (btnId) {
            case "btnHome":
                console.log("btnHome");
                window.location.href = "/";
                break;
            case "btnSearch":
                filterlist()
                break;
            case "btnRefresh":
                console.log("btnRefresh");
                $.ajax({
                        method: "GET",
                        url: "/api/refresh/"
                    })
                    .done((data) => {
                        $("#spanStatus").html("Data Refreshed")
                        // setTimeout(()=>{window.location.href="/"}, 1000)
                        window.location.href = "/"
                    })
                break;
            case "btnHelp":
                $('#helpModal').modal('toggle');
                break;
            case "addNote":
                console.log($(this).attr("data-id"));
                var note = {};
                note.title = $("#noteTitle").val();
                note.notes = $("#noteData").val();
                $.ajax({
                        method: "POST",
                        url: "api/note/" + $(this).attr("data-id"),
                        data: note
                    })
                    .done((data) => {
                        $(".collapse").collapse('hide');
                        addNotesToDiv(data);
                    })
                break;
            case "delArticle":
                console.log($(this).parent);
                $.ajax({
                        method: "DELETE",
                        url: "api/article/" + $(this).attr("data-id")
                    })
                    .done((data) => {
                        $("#spanStatus").html("Article Deleted");
                        // setTimeout(()=>{window.location.href="/"}, 1000)
                        window.location.href = "/"
                    });
                break;
            default:
                console.log("unknown button =>", this);

        };
    });
    $(".heading").on("click", function () {
        console.log(notes);
        $("#articles").css({
            'width': '60%'
        });
        showNotes($(this).attr("data-id"));

    });
})

function filterlist() {
    var filterValue = $("#inputSearch").val();
    console.log(filterValue);
    $("#liArticles li").each(function(index){
        if (!$(this).text().includes(filterValue)){
            $(this).remove()
        }
    })
}

function showNotes(id) {
    console.log("showNotes", id);
    var form = $('<form id="notesform">');

    form.append('<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title"><a data-toggle="collapse" href="#collapse1">Click here to Add new note</a></h3></div><div class="panel-collapse collapse" id="collapse1"><div class="panel-body"><div class="form-group"><label for="noteTitle">Title</label><textarea class="form-control" id="noteTitle" rows="1"></textarea></div><div class="form-group"><label for="noteData">Content</label><textarea class="form-control" id="noteData" rows="3"></textarea></div><button type="button" class="btn btn-default" id="addNote" data-id="' + id + '">Submit</button>')

    $("#formdiv").html(form);
    $("#notesdiv").html("");
    $.ajax({
            method: "GET",
            url: "/api/note/",
            data: {
                _id: id
            }
        })
        .done((data) => {
            data.map((note) => {
                addNotesToDiv(note)
            });
        })
}

function addNotesToDiv(note) {
    var notes = $('<div class="note">')
    notes.prepend('<p class="title">' + note.title + '</p><p class="note">' + note.notes + '</p>')
    $("#notesdiv").prepend(notes);
}
