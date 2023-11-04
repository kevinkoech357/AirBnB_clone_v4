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

  // Function to update the availability status
  function updateApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });

    // Function to send a POST request and create article tags
    function fetchAndDisplayPlaces () {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
          const placesSection = $('.places');
          placesSection.empty(); // Clear existing articles

          data.forEach(function (place) {
            // Create an article tag for each Place
            const article = $('<article>');
            article.append('<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">$' + place.price_by_night + '</div>' +
              '</div>');
            article.append('<div class="information">' +
              '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
              '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
              '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
              '</div>');
            article.append('<div class="description">' + place.description + '</div>');
            placesSection.append(article);
          });
        },
        error: function (xhr, status, error) {
          console.log('Error:', error);
        }
      });
    }

    // Call the fetchAndDisplayPlaces function to load places from the frontend
    fetchAndDisplayPlaces();
  }
});
