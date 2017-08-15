// Initialize Firebase
var config = {
    apiKey: "AIzaSyDJEmdjVcr2FgWihi6NnrPdfRuvJnzRjHs",
    authDomain: "reservation-site-9f770.firebaseapp.com",
    databaseURL: "https://reservation-site-9f770.firebaseio.com",
    projectId: "reservation-site-9f770",
    storageBucket: "reservation-site-9f770.appspot.com",
    messagingSenderId: "23179045719"
  };
  firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();

// Reservations

var reservationData = {};

getReservations();

$('#reserve').on('submit', function(e) {
  // prevent the page from reloading
  e.preventDefault();
  // check form is filled out
  $('.error').text('');
  if ($('#reservationName').val() == '' || $('#reservationDate').val() == '') {
    $('.error').text('Please fill out entire form.');
  } else {
  // grab name from input field
	var reservationName = $('#reservationName').val();
  var reservationDate = $('#reservationDate').val();
  // clear name from the input (for UX purposes)
	$('#reservationName').val('');
  $('#reservationDate').val('');
  // create a section for comments data in your db
  var reservationData = database.ref('reservations');
  // use the set method to save data to the comments
  reservationData.push({
    name: reservationName,
    date: reservationDate
  });
  getReservations();
};
});

// Handlebars

function getReservations() {
  database.ref('reservations').on('value', function (results) {
    var allReservations = results.val();
    var reservations = [];
    for (var item in allReservations) {
      var context = {
        name: allReservations[item].name,
        date: allReservations[item].date,
      };
      var source = $("#reservation-template").html();
      var template = Handlebars.compile(source);
      var reservationListElement = template(context);
      reservations.push(reservationListElement);
    }
    // remove all list items from DOM before appending list items
    $('.reservations-list').empty()
    // append each comment to the list of comments in the DOM
    for (var i in reservations) {
      $('.reservations-list').append(reservations[i])
    }
  });
};

// Google Map API
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false,
    styles: [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        { saturation: -100 } // <-- THIS
      ]
    }
]
    });
	var marker = new google.maps.Marker({
		position: {lat: 40.8054491, lng: -73.9654415},
		map: map,
    title: 'Monks Café'
	});
};