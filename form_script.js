$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var lat = urlParams.get('lat');
    var lng = urlParams.get('lng');

    // Afficher les coordonnées dans le champ texte (peut être masqué si nécessaire)
    if (lat !== null && lng !== null) {
        $('#memoryText').val('Coordinates: Lat=' + lat + ', Lng=' + lng);
    }

    $('#sendMemoryButton').on('click', function () {
        var memoryText = $('#memoryText').val();
        if (memoryText.trim() !== '') {
            sendMemory(lat, lng, memoryText);
        } else {
            alert('Please enter a memory before submitting.');
        }
    });
});

function sendMemory(lat, lng, memoryText) {
    var coordinates = 'Lat=' + lat + ', Lng=' + lng;
    
    emailjs.send("service_f48v2un", "template_vxz0hml", {
        coordinates: coordinates,
        memoryText: memoryText
    }).then(
        function (response) {
            console.log('E-mail sent successfully:', response);
            // Ajoutez ici toute logique supplémentaire après l'envoi réussi
            showConfirmationMessage();
        },
        function (error) {
            console.log('Error sending e-mail:', error);
            // Ajoutez ici toute logique supplémentaire en cas d'erreur

            // Affichez les détails de l'erreur dans une alerte pour un débogage rapide
            alert('Error sending e-mail: ' + JSON.stringify(error));
        }
    );
}

function showConfirmationMessage() {
    // Afficher le message de confirmation
    $('#confirmation-message').fadeIn().delay(2000).fadeOut();
    // Ajoutez ici toute logique supplémentaire après l'affichage du message de confirmation
}
