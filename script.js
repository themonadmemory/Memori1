// script.js

const addMemoriesLink = '<p id="addMemoriesLink" class="popup-link">Add your memories here</p>';
const addMemoriesLinkLarge = '<p id="addMemoriesLink" class="popup-link-large">Add your memories here</p>';

var souvenirs = [
  
    
    // Ajoutez d'autres souvenirs fictifs au besoin
];

var manualMemories = [
    { lat: 38.907, lng: -77.037, message: "On a desktop, right-click on the map to add a memory. On mobile, tap and hold on the map to add a memory. A popup will appear, allowing users to click on" },
    { lat: -21.2426, lng: 55.7064, message: "Welcome to MEMORIA, where the first memory is the beginning of a collective story. Monad" },
    // Ajoutez d'autres souvenirs manuels au besoin
];

var lastClickedCoords;
var map = L.map('interactive-map').setView([40, -95], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Ajoutez les souvenirs existants
souvenirs.forEach(function (souvenir) {
    createMarker(souvenir);
});

// Ajoutez les souvenirs manuels
manualMemories.forEach(function (memory) {
    createMarker(memory);
});

map.on('contextmenu', function (event) {
    lastClickedCoords = event.latlng;

    var popupContent = isMobile() ? addMemoriesLinkLarge : addMemoriesLink;

    var popup = L.popup()
        .setLatLng(event.latlng)
        .setContent(popupContent)
        .openOn(map);

    $('#addMemoriesLink').on('click', function () {
        // Appeler une fonction pour pré-remplir le formulaire avec les coordonnées
        fillFormWithCoordinates(lastClickedCoords.lat, lastClickedCoords.lng);

        // Rediriger vers le formulaire
        redirectToForm();

        // Supprimer l'événement click pour éviter les appels multiples
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
        // Appeler une fonction pour pré-remplir le formulaire avec les coordonnées
        fillFormWithCoordinates(lastClickedCoords.lat, lastClickedCoords.lng);

        // Rediriger vers le formulaire
        redirectToForm();

        // Supprimer l'événement click pour éviter les appels multiples
        $('#addMemoriesLink').off('click');
    });
});

function createMarker(souvenir) {
    var marker = L.marker([souvenir.lat, souvenir.lng]).addTo(map);
    marker.bindPopup(souvenir.message);
    marker.on('click', function () {
        // Afficher la bulle/fenêtre de lecture sans rediriger vers le formulaire
        marker.openPopup();
    });
}

function fillFormWithCoordinates(lat, lng) {
    // Remplir le champ texte du formulaire avec les coordonnées
    var memoryText = 'Coordinates: Lat=' + lat + ', Lng=' + lng + ' (' + lat + ', ' + lng + ')';
    // Vous pouvez ajouter d'autres informations ou instructions ici si nécessaire
    $('#memoryText').val(memoryText);
}

function redirectToForm() {
    // Rediriger vers le formulaire seulement si la fenêtre "Add your memories here" est cliquée
    window.location.href = 'submit_memory.html?lat=' + lastClickedCoords.lat + '&lng=' + lastClickedCoords.lng;
}

function isMobile() {
    return window.innerWidth <= 767;
}
