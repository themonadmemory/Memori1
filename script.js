// script.js

const addMemoriesLink = '<p id="addMemoriesLink" class="popup-link">Add your memories here</p>';
const addMemoriesLinkLarge = '<p id="addMemoriesLink" class="popup-link-large">Add your memories here</p>';

var souvenirs = [
    // Ajoutez d'autres souvenirs fictifs au besoin
];

var manualMemories = [
    { lat: -21.2426, lng: 55.7064, message: "Welcome to MEMORIA, where the first memory is the beginning of a collective story. Monad" },
    { lat: 38.907, lng: -77.037, message: "On a desktop, right-click on the map to add a memory. On mobile, tap and hold on the map to add a memory. A popup will appear, allowing users to click on ADD YOUR MEMORIES HERE." },
    // Ajoutez d'autres souvenirs manuels au besoin
];

var lastClickedCoords;
var map;
var satelliteLayer;

// Remplacez YOUR_API_KEY par votre clé d'API ArcGIS
esriConfig.apiKey = "AAPK0c6e0245584d48d29c34a7bc7df9e0cahg9dhmsyGMepmzzXz2avzAcwwvews96RpSYHTO_XsnKS9faSdbTR_slRqpDsuueN";

// Créez la carte et ajoutez la couche de tuiles satellite d'Esri
const arcgisMap = new Map({
    basemap: "arcgis-topographic" // Couche de fond de carte
});

const view = new MapView({
    map: arcgisMap,
    center: [-21.2426, 55.7064], // Remplacez ces coordonnées par celles que vous souhaitez
    zoom: 4, // Niveau de zoom initial
    container: "interactive-map", // ID du conteneur
    constraints: {
        snapToZoom: false
    }
});

// Créez une couche de tuiles satellite d'Esri
satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?token=AAPK0c6e0245584d48d29c34a7bc7df9e0cahg9dhmsyGMepmzzXz2avzAcwwvews96RpSYHTO_XsnKS9faSdbTR_slRqpDsuueN', {
    attribution: '© Esri',
    maxZoom: 18
});

// Créez une carte Leaflet et ajoutez la couche de tuiles satellite
map = L.map('interactive-map').setView([manualMemories[0].lat, manualMemories[0].lng], 4); // Centrer sur le premier marqueur
satelliteLayer.addTo(map);

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
