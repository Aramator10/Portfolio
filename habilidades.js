let devMode = false;

window.onload = function() {
    loadAbilities();
};

// Muestra la contraseña para activar el modo desarrollador
function showPasswordPrompt() {
    const devModeButton = document.getElementById('devModeButton');
    const passwordContainer = document.getElementById('passwordContainer');
    
    devModeButton.style.display = 'none';
    passwordContainer.style.display = 'block';
}

// Activa o desactiva el modo desarrollador
function toggleDevMode() {
    const abilitiesInput = document.getElementById('abilitiesInput');
    const saveButton = document.querySelector('.save-button');
    const deleteButton = document.querySelector('.delete-button');
    const devModeButton = document.getElementById('devModeButton');
    const passwordContainer = document.getElementById('passwordContainer');
    
    devMode = !devMode;

    if (devMode) {
        passwordContainer.style.display = 'none';
        abilitiesInput.style.display = 'block';
        saveButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';
    } else {
        passwordContainer.style.display = 'none';
        devModeButton.style.display = 'block';
        abilitiesInput.style.display = 'none';
        saveButton.style.display = 'none';
        deleteButton.style.display = 'none';
    }
}

// Verifica la contraseña y activa el modo desarrollador
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'hola') { // Cambia 'hola' por tu contraseña deseada
        toggleDevMode();
        document.getElementById('password').value = '';
    } else {
        alert('Contraseña incorrecta. Inténtalo de nuevo.');
    }
}

// Permite verificar la contraseña con la tecla "Enter"
function checkPasswordOnEnter(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}

// Guardar habilidades
function saveAbilities() {
    const abilitiesText = document.getElementById('abilitiesInput').value;
    
    // Formatear el texto para que cada línea aparezca como un elemento de lista desordenada
    const abilitiesFormatted = abilitiesText.split('\n').map(line => `<li> ${line}</li>`).join('');

    // Actualizar el contenido HTML del elemento de la lista
    document.getElementById('abilitiesText').innerHTML = `<ul>${abilitiesFormatted}</ul>`;
    
    // Guardar en localStorage
    localStorage.setItem('abilities', abilitiesFormatted);
    
    // Ocultar el área de entrada y botones
    document.getElementById('abilitiesInput').style.display = 'none';
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.delete-button').style.display = 'none';
    document.getElementById('devModeButton').style.display = 'block'; // Mostrar el botón de modo desarrollador
}

// Cargar habilidades
function loadAbilities() {
    const abilities = localStorage.getItem('abilities');
    if (abilities) {
        // Mostrar el contenido en formato de lista
        document.getElementById('abilitiesText').innerHTML = `<ul>${abilities}</ul>`;
    }
}

// Eliminar habilidades
function deleteAbilitiesText() {
    localStorage.removeItem('abilities');
    document.getElementById('abilitiesText').innerHTML = "<ul><li>Aquí puedes escribir sobre tus habilidades.</li></ul>";
    document.getElementById('abilitiesInput').style.display = 'none';
    document.querySelector('.save-button').style.display = 'none';
    document.querySelector('.delete-button').style.display = 'none';
    document.getElementById('devModeButton').style.display = 'block'; // Mostrar el botón de modo desarrollador
}
