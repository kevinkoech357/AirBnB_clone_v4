$(document).ready(function () {
  // Initialize an empty array to store checked amenity names
  const checkedAmenities = [];

  // Function to update the list of checked amenities
  function updateAmenitiesList () {
    const amenitiesList = checkedAmenities.join(', ');
    // Update the text of the <h4> tag inside the <div> with the class "amenities"
    $('.amenities h4').text(amenitiesList);
  }

  // Listen for changes on input checkboxes
  $('input[type=checkbox][name=amenity]').change(function () {
    const amenityName = $(this).data('name'); // Get the Amenity name from the data-name attribute

    if ($(this).is(':checked')) {
      // If the checkbox is checked, add the Amenity name to the array
      checkedAmenities.push(amenityName);
    } else {
      // If the checkbox is unchecked, remove the Amenity name from the array
      const index = checkedAmenities.indexOf(amenityName);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }

    // Update the list of checked amenities
    updateAmenitiesList();
  });
});

$(document).ready(function () {
  // Function to update the availability status
  function updateApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  // Initial check and update
  updateApiStatus();

  // Periodically check and update every 5 seconds
  setInterval(updateApiStatus, 5000);
});
