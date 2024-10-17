function createCards(data) {
    const container = document.getElementById('card-container');

    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    data.forEach(item => {
        const cardHTML = `
            <div class="card col-sm-6 col-md-6 col-lg-4 shadow-sm">
                <h5 class="card-title m-2 display-6">${item.title}</h5>
                <img src="${item.image}" class="card-img-top rounded" alt="${item.title}">
                <div class="card-body pl-0 p-0 pt-3 pb-3">
                    <p class="card-text lead">
                        ${new Date(item.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
        `;

        container.innerHTML += cardHTML;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card-container');
    
    fetch('https://67103452a85f4164ef2d58a1.mockapi.io/photoApi/photos')
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                container.innerHTML = ''; 
                createCards(data)
            }     
        });
});

document.getElementById('openCamera').addEventListener('click', () => {
    window.location.href = '/views/camara.html';
});
