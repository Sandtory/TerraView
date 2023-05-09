const fetchPics = async () => {
    const searchparam = document.getElementById("search").value;
    try {
        const response = await fetch(`/search/${searchparam}`);
        if (response.status === 200) {
            console.log('200');
            const res = await response.json();
            let latList = [];
            let lonList = [];
            for (let i = 0; i < res.photos.photo.length; i++) {
                latList.push(res.photos.photo[i].latitude)
                lonList.push(res.photos.photo[i].longitude)
                // Get image from json file
                photo = res.photos.photo[i];
                t_url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
                p_url = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
                
                // set marker and popup content on map
                const popupContent = document.createElement("div")
                popupContent.innerHTML = "<img src='" + t_url + "'>"
                       + "<a target='_blank' href='" + p_url + "'>View the image on flickr</a>";

                L.marker([latList[i], lonList[i]]).bindPopup(popupContent, {maxWidth: "auto"}).addTo(map).addTo(layerGroup); 
            }
            // Check if list is empty or not
            if(latList.length === 0) {
                console.log("No pictures found");
            }
            
        }
    } catch (err) {
        console.log(err)
    }
};
// initialize map
var center = [0, 0];
let marker;
var map = L.map('map').setView(center, 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxBounds: bounds,
    maxBoundsViscolity: 1.0,
    maxZoom: 19,
    minZoom: 2,
    attribution: '© OpenStreetMap'
}).addTo(map);
var layerGroup = L.layerGroup().addTo(map);

var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});


const button = document.getElementsByClassName("srcBtn")[0]. addEventListener("click", (e) => fetchPics(e));