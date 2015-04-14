var maxLists = 5;
var containerId = "select-container";
var locationLists;

$("document").ready(function () {
    startApp();
    $("#restart").click(function () {
        startApp();
    });
});

function startApp() {

    //clear app container, set title and reset total distance
    $("#" + containerId).html("");
    $(".panel-title").html("Choose Up To " + maxLists + " Locations")
    $("#total-distance").html("0");


    //request and store JSON objects of id, city and state for each available location
    $.ajax('/api/locations')
        .done(function (data) {
            locationLists = new LocationLists(maxLists, data, containerId);
        })
        .fail(function (jqXHR, textStatus, error) {
            LocationLists.prototype.errorHandler(error);
        });

}