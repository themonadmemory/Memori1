$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var lat = urlParams.get('lat');
    var lng = urlParams.get('lng');

    if (lat !== null && lng !== null) {
        $('#memoryText').val('Coordinates: Lat=' + lat + ', Lng=' + lng);
    }

    // Détachez d'abord l'événement de clic existant pour éviter les duplications
    $('#sendMemoryButton').off('click').on('click', function() {
        sendMemory();
    });

    $('#addMemoriesLink').on('click', function() {
        // Appeler une fonction pour pré-remplir le formulaire avec les coordonnées
        fillFormWithCoordinates(lat, lng);
    });
});

function fillFormWithCoordinates(lat, lng) {
    // Remplir le champ texte du formulaire avec les coordonnées
    var memoryText = 'Coordinates: Lat=' + lat + ', Lng=' + lng + ' (' + lat + ', ' + lng + ')';
    // Vous pouvez ajouter d'autres informations ou instructions ici si nécessaire
    $('#memoryText').val(memoryText);
}

function sendMemory() {
    var memoryText = $('#memoryText').val();

    // Remplacez "votre_service_id_emailjs" et "votre_template_id_emailjs" par vos identifiants
    emailjs.sendForm("service_f48v2un", "template_vxz0hml", {
        memoryText: memoryText
    }).then(
        function(response) {
            console.log('E-mail sent successfully:', response);
            // Afficher un message de confirmation à l'utilisateur
            alert('Your memory has been sent successfully!');
            // Rediriger vers la page index.html
            window.location.href = 'index.html';
        },
        function(error) {
            console.log('Error sending e-mail:', error);
            // Afficher un message d'erreur à l'utilisateur
            alert('Error sending your memory. Please try again later.');
        }
    );
}
