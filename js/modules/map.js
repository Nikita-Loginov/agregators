const CONFIG = {
  MAP: {
    DEFAULT_ZOOM: 13,
    ACTIVE_ZOOM: 16,
    FALLBACK_CENTER: [55.18, 25.15],
  },

  MARKER: {
    ICON_SIZE: [32, 32],
    ICON_ANCHOR: [16, 32],

    CLASS: "decor__map",
    ACTIVE_CLASS: "decor__map--active",
    PREMIUM_CLASS: "decor__map--premium",

    ACTIVE_ICON_SVG: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.3332 11.3334V7.63482C13.3332 7.27859 13.3329 7.10038 13.2895 6.93462C13.2512 6.78773 13.1882 6.64871 13.1029 6.52309C13.0067 6.38134 12.8729 6.26379 12.6048 6.02922L9.40478 3.22922C8.90704 2.79369 8.65817 2.57604 8.37809 2.49321C8.1313 2.42023 7.86824 2.42023 7.62145 2.49321C7.34158 2.57598 7.09307 2.79343 6.59608 3.22829L3.39502 6.02922C3.12693 6.2638 2.9932 6.38134 2.89697 6.52309C2.8117 6.64871 2.7482 6.78773 2.70982 6.93462C2.6665 7.10038 2.6665 7.27859 2.6665 7.63482V11.3334C2.6665 11.9547 2.6665 12.2652 2.768 12.5102C2.90332 12.8369 3.16272 13.0968 3.48942 13.2321C3.73445 13.3336 4.04508 13.3336 4.66633 13.3336C5.28759 13.3336 5.59856 13.3336 5.84359 13.2321C6.17029 13.0968 6.42962 12.837 6.56494 12.5103C6.66643 12.2653 6.6665 11.9546 6.6665 11.3334V10.6667C6.6665 9.93034 7.26346 9.33338 7.99984 9.33338C8.73622 9.33338 9.33317 9.93034 9.33317 10.6667V11.3334C9.33317 11.9546 9.33317 12.2653 9.43466 12.5103C9.56999 12.837 9.82938 13.0968 10.1561 13.2321C10.4011 13.3336 10.7117 13.3336 11.333 13.3336C11.9543 13.3336 12.2652 13.3336 12.5103 13.2321C12.837 13.0968 13.0963 12.8369 13.2316 12.5102C13.3331 12.2652 13.3332 11.9547 13.3332 11.3334Z" fill="white"/>
      </svg>
    `,
  },

  TILE: {
    URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    ATTRIBUTION:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },

  CLUSTER: {
    maxClusterRadius: 80,
    showCoverageOnHover: true,
    disableClusteringAtZoom: 17,
    animate: true,
  },
};

const getMarkerState = (warehouse) => ({
  isActive: Boolean(warehouse?.isActive),
  isPremium: warehouse.status === "premium",
});

const createMarkerIcon = (warehouse) => {
  const { isActive, isPremium } = getMarkerState(warehouse);

  const classes = [
    CONFIG.MARKER.CLASS,
    isActive && CONFIG.MARKER.ACTIVE_CLASS,
    isPremium && CONFIG.MARKER.PREMIUM_CLASS,
  ]
    .filter(Boolean)
    .join(" ");

  return L.divIcon({
    html: `
      <div class="${classes}">
        <span class="icon icon--little">
          ${
            isActive
              ? CONFIG.MARKER.ACTIVE_ICON_SVG
              : warehouse.icon
              ? `<img src="${warehouse.icon}" alt="иконка дома" />`
              : `<div class="icon--default"></div>`
          }
        </span>
      </div>
    `,
    iconSize: CONFIG.MARKER.ICON_SIZE,
    iconAnchor: CONFIG.MARKER.ICON_ANCHOR,
    className: "",
  });
};

export const initSimpleMap = (idMap = "map", warehouses = [], options = {}) => {
  const map = L.map(idMap).setView(
    warehouses[0]?.coordinates ?? CONFIG.MAP.FALLBACK_CENTER,
    CONFIG.MAP.DEFAULT_ZOOM
  );

  L.tileLayer(CONFIG.TILE.URL, {
    attribution: CONFIG.TILE.ATTRIBUTION,
  }).addTo(map);

  const markersCluster = L.markerClusterGroup({
    ...CONFIG.CLUSTER,
    ...options.clusterOptions,
  });

  let activeMarker = null;

  const setActiveMarker = (marker) => {
    if (activeMarker === marker) return;

    if (activeMarker) {
      activeMarker.__warehouse.isActive = false;
      activeMarker.setIcon(createMarkerIcon(activeMarker.__warehouse));
    }

    marker.__warehouse.isActive = true;
    marker.setIcon(createMarkerIcon(marker.__warehouse));

    activeMarker = marker;

    map.setView(marker.getLatLng(), CONFIG.MAP.ACTIVE_ZOOM, {
      animate: true,
    });
  };

  const markers = warehouses.map((warehouse) => {
    const marker = L.marker(warehouse.coordinates, {
      icon: createMarkerIcon(warehouse),
    });

    marker.__warehouse = warehouse;

    marker.on("click", () => setActiveMarker(marker));

    if (warehouse.isActive) {
      activeMarker = marker;
    }

    return marker;
  });

  markersCluster.addLayers(markers);
  map.addLayer(markersCluster);

  if (activeMarker) {
    markersCluster.zoomToShowLayer(activeMarker, () => {
      setActiveMarker(activeMarker);
    });
  } else if (markers.length) {
    const bounds = markersCluster.getBounds();
    bounds.isValid() && map.fitBounds(bounds.pad(0.1));
  }

  const updateMarkers = (newWarehouses) => {
    markersCluster.clearLayers();
    activeMarker = null;

    const newMarkers = newWarehouses.map((warehouse) => {
      const marker = L.marker(warehouse.coordinates, {
        icon: createMarkerIcon(warehouse),
      });

      marker.__warehouse = warehouse;
      marker.on("click", () => setActiveMarker(marker));

      if (warehouse.isActive) {
        activeMarker = marker;
      }

      return marker;
    });

    markersCluster.addLayers(newMarkers);

    if (activeMarker) {
      markersCluster.zoomToShowLayer(activeMarker, () => {
        setActiveMarker(activeMarker);
      });
    }

    return newMarkers;
  };

  return {
    map,
    markers: markersCluster,
    markersArray: markers,
    updateMarkers,
  };
};
