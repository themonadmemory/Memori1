// Remplacez "votre_identifiant_utilisateur_emailjs" par votre identifiant utilisateur EmailJS
emailjs.init("uJXvdSqKo6hv3ydbY");

// Fonction pour envoyer la mémoire par e-mail
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

            // Ajoutez ici toute logique supplémentaire après l'envoi réussi si nécessaire
        },
        function(error) {
            console.log('Error sending e-mail:', error);
            // Afficher un message d'erreur à l'utilisateur
            alert('Error sending your memory. Please try again later.');

            // Ajoutez ici toute logique supplémentaire en cas d'erreur si nécessaire
        }
    );
}
