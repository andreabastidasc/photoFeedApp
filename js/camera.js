// Obtener los elementos necesarios del DOM
const preview = document.getElementById('preview');
const cameraView = document.getElementById('cameraView');
const cancelButton = document.getElementById('cancelButton');
const canvas = document.getElementById('canvas');
const photoTitle = document.getElementById('photoTitle');
const confirmButton = document.getElementById('confirmButton');
const captureButton = document.getElementById('captureButton');
let capturedImage = null;

const mockApiUrl = 'https://67103452a85f4164ef2d58a1.mockapi.io/photoApi/photos';

const inputFile = document.createElement('input');
inputFile.type = 'file';
inputFile.accept = 'image/*';
inputFile.capture = 'camera';

const supportsCameraAPI = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;

function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraView.srcObject = stream;
            cameraView.style.display = 'block';
        })
        .catch(error => {
            console.error('Error accessing the camera', error);
            alert('Could not access the camera');
        });
}

function captureFromCamera() {
    const context = canvas.getContext('2d');
    canvas.width = cameraView.videoWidth;
    canvas.height = cameraView.videoHeight;
    context.drawImage(cameraView, 0, 0, canvas.width, canvas.height);

    capturedImage = canvas.toDataURL('image/webp');
    preview.src = capturedImage;
    preview.style.display = 'block';
    cameraView.style.display = 'none';
}

function updateButtonState() {
    if (navigator.onLine) {
        confirmButton.disabled = false;
    } else {
        confirmButton.disabled = true;
    }
}

updateButtonState()

window.addEventListener('online', updateButtonState);
window.addEventListener('offline', updateButtonState);

preview.addEventListener('dblclick', () => {
    if (supportsCameraAPI) {
        startCamera();
        preview.style.display = 'none';
    } else {
        inputFile.click();
    }
});

inputFile.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;

            image.onload = () => {
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                capturedImage = canvas.toDataURL('image/webp');
                preview.src = capturedImage;
                preview.style.display = 'block';
            };
        };
        reader.readAsDataURL(file);
    }
});

captureButton.addEventListener('click', () => {
    captureFromCamera()
});

confirmButton.addEventListener('click', async(event) => {
    event.preventDefault()
    const title = photoTitle.value;

    const createdAt = new Date().toISOString();

    const photoData = {
        title: title,
        image: capturedImage,
        createdAt: createdAt
    };

    try {
        const response = await fetch(mockApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(photoData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Error uploading image:', error);
    }
});

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/photoFeedApp/index.html';
});
