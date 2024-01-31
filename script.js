// script.js

const addMemoriesLink = '<p id="addMemoriesLink" style="text-decoration: underline; color: blue; cursor: pointer;">Add your memories here</p>';
const addMemoriesLinkLarge = '<p id="addMemoriesLink" style="font-size: 18px; text-decoration: underline; color: blue; cursor: pointer;">Add your memories here</p>';

var souvenirs = [
    { lat: 40.7128, lng: -74.0060, message: "Statue de la Liberté" },
    { lat: 34.0522, lng: -118.2437, message: "Hollywood Sign" }
    
    // Ajoutez d'autres souvenirs fictifs au besoin
];

var manualMemories = [
    { lat: 38.907, lng: -77.037, message: "Alpha test" },
    { lat: 34.0522, lng: -118.2437, message: "Beta test" },
    { lat: 40.3506, lng: -77.5634, message: "test" }
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
