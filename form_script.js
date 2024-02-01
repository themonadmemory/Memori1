$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var lat = urlParams.get('lat');
    var lng = urlParams.get('lng');

   // Afficher les coordonnées dans le champ texte (peut être masqué si nécessaire)
    if (lat !== null && lng !== null) {
    // Remplacer l'appel à fillFormWithCoordinates par le code direct ici
    $('#memoryText').val('Coordinates: Lat=' + lat + ', Lng=' + lng);
}

    $('#sendMemoryButton').on('click', function() {
        sendMemory();
    });

    $('#addMemoriesLink').on('click', function() {
        // Appeler une fonction pour pré-remplir le formulaire avec les coordonnées
        fillFormWithCoordinates(lat, lng);
    });

    // Optionnel : Masquer les coordonnées par défaut
    // $('#memoryText').hide();

    // Optionnel : Afficher les coordonnées si nécessaire
    // $('#showCoordinatesButton').on('click', function() {
    //     $('#memoryText').show();
    // });
});

function fillFormWithCoordinates(lat, lng) {
    // Remplir le champ texte du formulaire avec les coordonnées
    var memoryText = 'Coordinates: Lat=' + lat + ', Lng=' + lng + ' (' + lat + ', ' + lng + ')';
    // Vous pouvez ajouter d'autres informations ou instructions ici si nécessaire
    $('#memoryText').val(memoryText);
}

function sendMemory() {
    var coordinates = $('#coordinates').val();
    var memoryText = $('#memoryText').val();

    emailjs.send("service_f48v2un", "template_vxz0hml", {
        coordinates: coordinates,
        memoryText: memoryText
    }).then(
        function(response) {
            console.log('E-mail sent successfully:', response);
            // Ajoutez ici toute logique supplémentaire après l'envoi réussi
        },
        function(error) {
            console.log('Error sending e-mail:', error);
            // Ajoutez ici toute logique supplémentaire en cas d'erreur

            // Affichez les détails de l'erreur dans une alerte pour un débogage rapide
            alert('Error sending e-mail: ' + JSON.stringify(error));
        }
    );
}
