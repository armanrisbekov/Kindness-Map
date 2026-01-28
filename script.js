const translations = {
    en: { title: "✨ Kindness Map 💫", all: "🌈 All", food: "🍎 Food", clothes: "👕 Clothes", mosque: "🕌 Mosques", charity: "🤝 Foundations", cityBtn: "Go to" },
    tr: { title: "✨ İyilik Haritası 💫", all: "🌈 Hepsi", food: "🍎 Yemek", clothes: "👕 Giysi", mosque: "🕌 Camiler", charity: "🤝 Vakıflar", cityBtn: "Git:" },
    kz: { title: "✨ Мейірімділік Картасы 💫", all: "🌈 Бәрі", food: "🍎 Тамақ", clothes: "👕 Киім", mosque: "🕌 Мешіттер", charity: "🤝 Қорлар", cityBtn: "Бару:" },
    ru: { title: "✨ Карта Добра 💫", all: "🌈 Все", food: "🍎 Еда", clothes: "👕 Одежда", mosque: "🕌 Мечети", charity: "🤝 Фонды", cityBtn: "Перейти в:" }
};

const cities = {
    astana: { name: "Astana 🇰🇿", coords: [51.1694, 71.4491] },
    ankara: { name: "Ankara 🇹🇷", coords: [39.9334, 32.8597] }
};

const locations = [
    const locations = [
    { type: 'village', name: {en: "🏠 <b>MY VILLAGE</b>", tr: "🏠 <b>KÖYÜM</b>", kz: "🏠 <b>МЕНІҢ АУЫЛЫМ</b>", ru: "🏠 <b>МОЯ ДЕРЕВНЯ</b>"}, coords: [51.1040, 71.3050], isSpecial: true },
    { type: 'food', name: {en: "Ankara Soup Center 🍲", tr: "Ankara Çorba Evi 🍲", kz: "Анкара сорпа үйі 🍲", ru: "Центр Супа Анкара 🍲"}, coords: [39.9400, 32.8640] },
    { type: 'clothes', name: {en: "Warm Jackets 🧥", tr: "Sıcak Ceketler 🧥", kz: "Жылы курткалар 🧥", ru: "Теплые куртки 🧥"}, coords: [51.1894, 71.4691] },
    { type: 'clothes', name: {en: "Charity Box 📦", tr: "Yardım Kutusu 📦", kz: "Қайырымдылық қорабы 📦", ru: "Бокс добра 📦"}, coords: [39.9200, 32.8500] },
    { type: 'mosque', name: {en: "Hazret Sultan Mosque 🕌", tr: "Hazret Sultan Camii 🕌", kz: "Әзірет Сұлтан Мешіті 🕌", ru: "Мечеть Хазрет Султан 🕌"}, coords: [51.1255, 71.4725] },
    { type: 'mosque', name: {en: "Kocatepe Mosque 🕌", tr: "Kocatepe Camii 🕌", kz: "Кожатепе Мешіті 🕌", ru: "Мечеть Коджатепе 🕌"}, coords: [39.9167, 32.8606] },
    { type: 'charity', name: {en: "Red Crescent (Kızılay) 🤝", tr: "Türk Kızılayı 🤝", kz: "Түрік Қызыл Жарты Айы 🤝", ru: "Турецкий Красный Полумесяц 🤝"}, coords: [39.9208, 32.8540] },
    { type: 'charity', name: {en: "Asar-Ume Charity 🤝", tr: "Asar-Ume Vakfı 🤝", kz: "Asar-Ume Қайырымдылық Қоры 🤝", ru: "Фонд Асар-Уме 🤝"}, coords: [51.1350, 71.4450] }
];

let currentCity = 'astana';
let currentFilter = 'all';
let currentLang = 'en';
let markers = [];

const map = L.map('map', { zoomControl: true }).setView(cities.astana.coords, 12);
map.zoomControl.setPosition('bottomright');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function handleLangChange() {
    const select = document.getElementById('langSelect');
    currentLang = select.value;
    updateUI();
}

function updateUI() {
    const t = translations[currentLang];
    document.getElementById('site-title').innerText = t.title;
    document.getElementById('btn-all').innerText = t.all;
    document.getElementById('btn-food').innerText = t.food;
    document.getElementById('btn-clothes').innerText = t.clothes;
    document.getElementById('btn-mosque').innerText = t.mosque;
    document.getElementById('btn-charity').innerText = t.charity;
    
    const nextCity = currentCity === 'astana' ? 'Ankara 🇹🇷' : 'Astana 🇰🇿';
    document.getElementById('city-text').innerText = `${t.cityBtn} ${nextCity}`;
    renderMarkers();
}

function renderMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    locations.forEach(loc => {
        if (currentFilter === 'all' || loc.type === currentFilter || loc.isSpecial) {
            const markerOptions = loc.isSpecial ? { icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }) } : {};

            const m = L.marker(loc.coords, markerOptions).bindPopup(`${loc.name[currentLang]}`).addTo(map);
            markers.push(m);
        }
    });
}

function toggleCity() {
    currentCity = (currentCity === 'astana') ? 'ankara' : 'astana';
    map.flyTo(cities[currentCity].coords, 13, { duration: 2.5 });
    updateUI();
}

function setFilter(type, btn) {
    currentFilter = type;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMarkers();
}

updateUI();

