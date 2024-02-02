const addMemoriesLink = '<p id="addMemoriesLink" class="popup-link">Add your memories here</p>';
const addMemoriesLinkLarge = '<p id="addMemoriesLink" class="popup-link-large">Add your memories here</p>';

var souvenirs = [
    // Ajoutez d'autres souvenirs fictifs au besoin
];

var manualMemories = [
    { lat: -20.3975, lng: 56.4365, message: "Ahoï !!! MEMORIA is an innovative platform designed to facilitate the exploration and sharing of memories worldwide. This interactive map-based application allows users to pinpoint and relive significant moments by adding their own memories to specific locations. On a desktop, right-click on the map to add a memory. On mobile, (landscape mode), tap and hold on the map to add a memory. A popup will appear, allowing users to click on ADD YOUR MEMORIES HERE." },
    { lat: 38.907, lng: -77.037, message: "On a desktop, right-click on the map to add a memory. On mobile, tap and hold on the map to add a memory. A popup will appear, allowing users to click on ADD YOUR MEMORIES HERE." },
    { lat: 36.157, lng: -82.728, message: "Shia Laboeuf VS Anons. Anons win with frog sound. Capture the flag. For the glorious favor of kek." },
    // Ajoutez d'autres souvenirs manuels au besoin
];

var lastClickedCoords;
var map = L.map('interactive-map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
map.setZoom(2); // Définir un niveau de zoom initial plus éloigné

// Ajoutez les souvenirs existants
souvenirs.forEach(function (souvenir) {
    createMarker(souvenir, false);
});

// Ajoutez les souvenirs manuels
manualMemories.forEach(function (memory, index) {
    // Utiliser 'blue' pour que le marqueur soit en bleu
    createMarker(memory, index === 0 ? false : true);
});

map.on('contextmenu', function (event) {
    lastClickedCoords = event.latlng;

    var popupContent = isMobile() ? addMemoriesLinkLarge : addMemoriesLink;

    var popup = L.popup()
        .setLatLng(event.latlng)
        .setContent(popupContent)
        .openOn(map);

    $('#addMemoriesLink').on('click', function () {
        fillFormWithCoordinates(lastClickedCoords.lat, lastClickedCoords.lng);
        redirectToForm();
        $('#addMemoriesLink').off('click');
    });
});

map.on('taphold', function (event) {
    lastClickedCoords = event.latlng;

    var popupContent = isMobile() ? addMemoriesLinkLarge : addMemoriesLink;

    var popup = L.popup()
        .setLatLng(event.latlng)
        .setContent(popupContent)
        .openOn(map);

    $('#addMemoriesLink').on('click', function () {
        fillFormWithCoordinates(lastClickedCoords.lat, lastClickedCoords.lng);
        redirectToForm();
        $('#addMemoriesLink').off('click');
    });
});

function createMarker(souvenir, isFirstMarker) {
    var markerColor = isFirstMarker ? 'black' : 'blue';
    var marker = L.marker([souvenir.lat, souvenir.lng], { icon: L.divIcon({ className: 'custom-marker', iconSize: [20, 20], html: '<i style="color:' + markerColor + ';" class="fas fa-map-marker-alt"></i>' }) }).addTo(map);

    marker.bindPopup(souvenir.message);
    marker.on('click', function () {
        marker.openPopup();
    });
}

function fillFormWithCoordinates(lat, lng) {
    var memoryText = 'Coordinates: Lat=' + lat + ', Lng=' + lng + ' (' + lat + ', ' + lng + ')';
    $('#memoryText').val(memoryText);
}

function redirectToForm() {
    window.location.href = 'submit_memory.html?lat=' + lastClickedCoords.lat + '&lng=' + lastClickedCoords.lng;
}

function isMobile() {
    return window.innerWidth <= 767;
}
