let devMode = false;
let videos = []; // Array para almacenar la información de los videos

window.onload = function() {
    loadVideos();
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
    const uploadSection = document.getElementById('uploadSection');
    const devModeButton = document.getElementById('devModeButton');
    const passwordContainer = document.getElementById('passwordContainer');
    
    devMode = !devMode;

    if (devMode) {
        passwordContainer.style.display = 'none';
        uploadSection.style.display = 'block'; 
    } else {
        passwordContainer.style.display = 'none';
        devModeButton.style.display = 'block';
        uploadSection.style.display = 'none';
    }

    // Mostrar u ocultar los botones de eliminar
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.style.display = devMode ? 'inline-block' : 'none';
    });
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

// Agregar un nuevo video con un botón de eliminar y controles de audio activados
function addVideo() {
    const titleInput = document.getElementById('titleInput').value;
    const videoInput = document.getElementById('videoInput').files[0];
    const videoList = document.getElementById('videoList');

    if (titleInput && videoInput) {
        const videoURL = URL.createObjectURL(videoInput);
        const videoData = {
            title: titleInput,
            url: videoURL
        };

        videos.push(videoData); // Añadir el video al array
        saveVideos(); // Guardar videos en localStorage
        displayVideos(); // Mostrar videos en la página

        // Limpiar los campos de entrada
        document.getElementById('titleInput').value = '';
        document.getElementById('videoInput').value = '';
    } else {
        alert('Por favor, complete todos los campos');
    }
}

// Guardar videos en localStorage
function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
}

// Cargar videos guardados
function loadVideos() {
    const savedVideos = localStorage.getItem('videos');
    if (savedVideos) {
        videos = JSON.parse(savedVideos);
        displayVideos(); // Mostrar videos al cargar
    }
}

// Mostrar videos en la página con sonido activado
function displayVideos() {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = ''; // Limpiar la lista de videos

    videos.forEach((videoData, index) => {
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        // Crear y agregar el título del video
        const videoTitle = document.createElement('h4');
        videoTitle.innerText = videoData.title;

        // Crear y agregar el elemento de video
        const videoElement = document.createElement('video');
        videoElement.controls = true; // Activar controles de video
        videoElement.muted = false; // Audio activado
        videoElement.src = videoData.url;

        // Crear y agregar el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar Video';
        deleteButton.classList.add('delete-button');
        deleteButton.style.display = devMode ? 'inline-block' : 'none';
        deleteButton.onclick = function() {
            videos.splice(index, 1); // Eliminar el video del array
            saveVideos(); // Actualizar el localStorage
            displayVideos(); // Volver a mostrar la lista de videos
        };

        // Agregar título, video y botón al contenedor
        videoContainer.appendChild(videoTitle);
        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(deleteButton);
        videoList.appendChild(videoContainer);
    });
}
