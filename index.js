let devMode = false; // Variable para controlar el modo desarrollador

window.onload = function() {
    loadAboutMe();
};

// Muestra la contraseña para activar el modo desarrollador
function showPasswordPrompt() {
    const passwordContainer = document.getElementById('passwordContainer');
    const devModeButton = document.getElementById('devModeButton');
    
    passwordContainer.style.display = 'block'; // Muestra el contenedor de contraseña
    devModeButton.style.display = 'none'; // Oculta el botón de Modo Desarrollador
}

// Activa o desactiva el modo desarrollador
function toggleDevMode() {
    devMode = !devMode;

    if (devMode) {
        enableEditing(true); // Habilitar la edición del texto
    } else {
        enableEditing(false); // Deshabilitar la edición del texto
    }
}

// Habilita o deshabilita la edición del texto
function enableEditing(enabled) {
    const aboutMeInput = document.getElementById('aboutMeInput');
    const saveButton = document.querySelector('.save-button');
    const deleteButton = document.querySelector('.delete-button');

    aboutMeInput.style.display = enabled ? 'block' : 'none';
    saveButton.style.display = enabled ? 'inline-block' : 'none';
    deleteButton.style.display = enabled ? 'inline-block' : 'none';
    aboutMeInput.disabled = !enabled; // Deshabilitar el área de texto si no está habilitada
}

// Permite editar el texto solo si el modo desarrollador está activo
function editAboutMe() {
    if (devMode) {
        enableEditing(true);
        document.getElementById('aboutMeInput').value = localStorage.getItem('aboutMe') || "";
    } else {
        alert('Activa el modo desarrollador para editar el texto.');
    }
}

function saveAboutMe() {
    const aboutMeText = document.getElementById('aboutMeInput').value;
    document.getElementById('aboutMeText').textContent = aboutMeText;
    localStorage.setItem('aboutMe', aboutMeText);
    enableEditing(false); // Deshabilitar la edición después de guardar
    document.getElementById('devModeButton').style.display = 'inline-block'; // Asegúrate de que se muestre el botón
}

function loadAboutMe() {
    const aboutMe = localStorage.getItem('aboutMe');
    if (aboutMe) {
        document.getElementById('aboutMeText').textContent = aboutMe;
    }
}

function deleteAboutMeText() {
    localStorage.removeItem('aboutMe');
    document.getElementById('aboutMeText').textContent = "Aquí puedes escribir una breve introducción sobre quién eres y tu experiencia en la edición de video.";
    enableEditing(false); // Deshabilitar la edición después de eliminar
}

// Verifica la contraseña y activa el modo desarrollador
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'hola') { // Cambia 'hola' por tu contraseña deseada
        toggleDevMode();
        document.getElementById('password').value = '';
        document.getElementById('passwordContainer').style.display = 'none'; // Ocultar el contenedor de contraseña
        enableEditing(true); // Asegúrate de habilitar la edición al ingresar la contraseña correcta
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
