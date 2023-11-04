$(document).ready(function () {
    // Initialize an empty array to store checked amenity names
    var checkedAmenities = [];

    // Function to update the list of checked amenities
    function updateAmenitiesList() {
        var amenitiesList = checkedAmenities.join(", ");
        // Update the text of the <h4> tag inside the <div> with the class "amenities"
        $(".amenities h4").text(amenitiesList);
    }

    // Listen for changes on input checkboxes
    $("input[type=checkbox][name=amenity]").change(function () {
        var amenityName = $(this).data("name"); // Get the Amenity name from the data-name attribute

        if ($(this).is(":checked")) {
            // If the checkbox is checked, add the Amenity name to the array
            checkedAmenities.push(amenityName);
        } else {
            // If the checkbox is unchecked, remove the Amenity name from the array
            var index = checkedAmenities.indexOf(amenityName);
            if (index !== -1) {
                checkedAmenities.splice(index, 1);
            }
        }

        // Update the list of checked amenities
        updateAmenitiesList();
    });
});
