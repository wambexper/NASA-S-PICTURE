document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
    document.getElementById('search-form').addEventListener('submit', (event) => {
        event.preventDefault();
        getImageOfTheDay();
    });

    document.getElementById('search-history').addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const selectedDate = event.target.textContent;
            getImageOfTheDay(selectedDate);
        }
    });
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImageData(currentDate);
}

function getImageOfTheDay(selectedDate = '') {
    const inputDate = selectedDate || document.getElementById('search-input').value;
    getImageData(inputDate);
    saveSearch(inputDate);
    addSearchToHistory();
}

function getImageData(date) {
    const apiKey = 'iUcVhVWLudDrG6HtADb4hKcsKeauiy0daJjJesKG'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.error('Error fetching image data:', error);
            displayError('Failed to fetch image data. Please try again.');
        });
}

function displayImage(data) {
    const container = document.getElementById('current-image-container');
    container.innerHTML = `<img src="${data.url}" alt="${data.title}" width="100%">`;
}

function displayError(message) {
    const container = document.getElementById('current-image-container');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
    const historyList = document.getElementById('search-history');
    historyList.innerHTML = '';

    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(search => {
        const listItem = document.createElement('li');
        listItem.textContent = search;
        historyList.appendChild(listItem);
    });
}
