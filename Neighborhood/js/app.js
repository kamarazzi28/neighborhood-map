let map;
let infoWindow;

const locations = [
    { title: "Charles Bridge", location: { lat: 50.0865, lng: 14.4114 } },
    { title: "Old Town Square", location: { lat: 50.0870, lng: 14.4208 } },
    { title: "Prague Castle", location: { lat: 50.0909, lng: 14.4005 } },
    { title: "Wenceslas Square", location: { lat: 50.0810, lng: 14.4254 } },
    { title: "Petrin Tower", location: { lat: 50.0838, lng: 14.3958 } }
];

// Initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 50.0870, lng: 14.4208 }, // Prague center
        zoom: 14
    });

    infoWindow = new google.maps.InfoWindow({ maxWidth: 300 });

    ko.applyBindings(new ViewModel());
}

// ViewModel for Knockout.js
function ViewModel() {
    const self = this;

    self.placeList = ko.observableArray([]);
    self.searchTerm = ko.observable('');

    locations.forEach(function (place) {
        const marker = new google.maps.Marker({
            position: place.location,
            title: place.title,
            map: map,
            animation: google.maps.Animation.DROP
        });

        place.marker = marker;
        self.placeList.push(place);

        marker.addListener('click', function() {
            const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${place.title}&format=json&origin=*`;

            fetch(wikiUrl)
                .then(response => response.json())
                .then(data => {
                    const pages = data.query.pages;
                    const page = Object.values(pages)[0];
                    const articleUrl = `https://en.wikipedia.org/wiki/${place.title.replace(/ /g, "_")}`;

                    let contentString = `
                        <div style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px;">
                            <h3 style="margin-top: 0;">${place.title}</h3>
                    `;

                    if (page.extract) {
                        contentString += `
                            <p style="margin: 10px 0;">${page.extract.substring(0, 300)}...</p>
                            <p><a href="${articleUrl}" target="_blank" style="color: #0077cc; text-decoration: none;">Read more on Wikipedia</a></p>
                        `;
                    } else {
                        contentString += `
                            <p>No information found on Wikipedia.</p>
                        `;
                    }

                    contentString += `</div>`;

                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);
                })
                .catch(() => {
                    infoWindow.setContent(`<h3>${place.title}</h3><p>Failed to load Wikipedia preview.</p>`);
                    infoWindow.open(map, marker);
                });

            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 700);
        });
    });

    // Filtered list of places
    self.filteredList = ko.computed(function () {
        const filter = self.searchTerm().toLowerCase();
        if (!filter) {
            self.placeList().forEach(place => place.marker.setVisible(true));
            return self.placeList();
        } else {
            return ko.utils.arrayFilter(self.placeList(), function (place) {
                const match = place.title.toLowerCase().includes(filter);
                place.marker.setVisible(match);
                return match;
            });
        }
    });

    // Click on list item triggers marker click
    self.selectPlace = function (place) {
        google.maps.event.trigger(place.marker, 'click');
    };
}
