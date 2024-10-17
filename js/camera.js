let video = document.getElementById('cameraView');
let canvas = document.getElementById('canvas');
let preview = document.getElementById('preview');
let photoTitle = document.getElementById('photoTitle');

document.getElementById('captureButton').addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let imageData = canvas.toDataURL('image/webp'); // Convert to Base64
    preview.src = imageData;
});

document.getElementById('confirmButton').addEventListener('click', () => {
    let imageData = canvas.toDataURL('image/webp');
    let title = photoTitle.value;

    // Post the image and title to MockAPI
    fetch('https://mockapi.io/your-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image: imageData,
            title: title,
            date: new Date().toLocaleString()
        })
    })
    .then(response => response.json())
    .then(() => {
        window.location.href = 'index.html'; // Go back to the reel
    });
});

// Start the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    });
