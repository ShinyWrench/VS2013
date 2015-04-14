
//LocationLists is a set of (jQuery stored) select lists stored in the selectLists array.
//The constructor takes a number for the maximum amount of select lists (maxSize), the list
//of places (JSON objects from an AJAX query in app.js) and the DOM id of an html container

function LocationLists(maxSize, places, containerId) {
    this.maxSize = maxSize;
    this.places = places;
    this.selectLists = [];
    this.coordinates = [];
    this.selectIndex = 0;
    this.containerId = containerId;
    this.totalDistance = 0;

    var self = this;

    //put list of city names into alphabetical order by city
    this.sortedPlaces = this.sortByKey(this.places, 'City');

    //make the first select list
    this.selectLists.push(this.addSelectList(this.places));
}

//used to alphabetize the place names for display in the select lists
LocationLists.prototype.sortByKey = function (array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (typeof x == "string") {
            x = x.toLowerCase();
            y = y.toLowerCase();
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

LocationLists.prototype.errorHandler = function (error) {
    $(".alert-danger p").html("Server Error: Please Reload Page");
    $(".alert-danger").css("display", "block");
    console.log(error);
}

//seeds the recursive ajax function
LocationLists.prototype.getCoordinates = function () {

    //clear the p's of old data
    $('#' + this.containerId + ' p')
        .html(".")
        .css("visibility", "hidden");

    this.totalDistance = 0;
    this.coordinates = [];
    var nodes = document.getElementById(this.containerId).childNodes;
    this.ajaxHandler(nodes, 0, nodes.length - 1);
}

//display distances between locations
LocationLists.prototype.displayData = function (coordinate) {

    //wait for two coordinates to be available then calculate and display the distance
    //above the second select list
    this.coordinates.push(coordinate);
    if (this.coordinates.length === 2) {
        var rawDistance = this.calculateDistance(
            this.coordinates[0].data.Latitude, this.coordinates[0].data.Longitude,
            this.coordinates[1].data.Latitude, this.coordinates[1].data.Longitude
            );
        var elementId = this.coordinates[1].element_id;

        this.totalDistance += rawDistance;

        var roundedDistance = Math.round(rawDistance);

        if (roundedDistance < 1) {
            var stringOut = " less than one mile";
        } else if (roundedDistance === 1) {
            var stringOut = " about one mile";
        } else {
            var stringOut = roundedDistance + " miles";
        }

        $('#' + elementId).siblings()
            .html(stringOut)
            .css("visibility", "visible");

        $('#total-distance').html(Math.round(this.totalDistance));

        //shift the first coordinate out of the coordinates array
        this.coordinates.shift();
    }
}

//calculate the distance between two points given their latitude and longitude
LocationLists.prototype.calculateDistance = function (lat1, long1, lat2, long2) {
    var radius = 6371; //radius of the Earth in km
    var dLat = this.deg2rad(lat2 - lat1);
    var dLong = this.deg2rad(long2 - long1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = radius * c; //distance in km
    var miles = .6214 * d; //distance in miles
    return miles;
}

LocationLists.prototype.deg2rad = function (deg)
{
    return deg * Math.PI / 180;
}

//recursive handler for one or more single-record api requests
LocationLists.prototype.ajaxHandler = function (nodes, index, final) {
    var self = this;
    var select = nodes[index].firstChild.nextSibling;
    if (this.getSelectValue(select.id) && this.getSelectValue(select.id) > 0) {
        $.ajax('api/locations/' + this.getSelectValue(select.id))
            .done(function (data) {                
                self.displayData({element_id: select.id, data: data});
                if (index < final) {
                    self.ajaxHandler(nodes, index + 1, final);
                }
            })
            .fail(function (jqXHR, textStatus, error) {
                this.errorHandler(error);
            });
    }
}

//jQuery proved unreliable for keeping track of select list values
LocationLists.prototype.getSelectValue = function (id) {
    var el = document.getElementById(id);
    if (el) {
        return el.options[el.selectedIndex].value;
    }
    return -1;
};

//helper function for the logic used to add and remove select lists
LocationLists.prototype.checkForEmptyList = function () {
    for (var i = 0; i < this.selectIndex; i++) {
        if (this.getSelectValue("select-index-" + i) === "") {
            return true;
        }
    }
    return false;
};

//creates a select list of places dynamically and removes one if necessary
//returns the jQuery element for the select list
LocationLists.prototype.addSelectList = function () {
    var self = this;

    //jQuery element for a select list
    var $placeSelect = $("<select>")
        .attr('id', 'select-index-' + this.selectIndex++)

        //add default value
        .append("<option value=''>Select a City</option>")

        //the change callback function controls creation and removal of select lists
        .change(function () {

            //on a select list change, add a new select list if:
            //an actual city is selected
            //there are no more than the maximum number of select lists already in the app
            //there are no empty value select lists
            if (
                $(this).val() &&
                self.selectLists.length < self.maxSize &&
                !self.checkForEmptyList()
                )
            {
                self.selectLists.push(self.addSelectList());

            //remove a select list if:
            //"Select a City" is selected and
            //there are two or more select lists in the app
            } else if (!$(this).val() && self.selectLists.length > 1) {

                //starting from the last select list, iterate backwards until the empty
                //select list is found and remove its jQuery object from the selectLists array
                for (var i = self.selectLists.length - 1; i >= 0; i--) {
                    if (!self.selectLists[i].val()) {
                        self.selectLists.splice(i, 1);
                        i = 0;
                    }
                }

                //remove the wrapper (and contents) from the html structure
                this.closest(".select-wrapper").remove();

                //if there is one less than the max value, check for an empty value
                //if no empty value is found, add a select list
                if (self.selectLists.length === self.maxSize - 1 &&
                    !self.checkForEmptyList()) 
                {
                    self.selectLists.push(self.addSelectList());
                }
            }

            //start the api / query for the location data
            self.getCoordinates();
        }
    );

    //add an option for each place (city and state) to the select list
    $.each(this.sortedPlaces, function (index, place) {
        $placeSelect.append("<option value='" + place['Id'] + "'>" + place['City'] + ", " + place['State'] + "</option>");
    });

    //append the place select list and a wrapper to the document's html
    $("#" + this.containerId).append(
        $("<div class='select-wrapper'>")
            .append("<p>")
            .append($placeSelect)
        );

    return $placeSelect;
}
