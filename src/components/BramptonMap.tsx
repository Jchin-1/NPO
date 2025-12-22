'use client';

import { useEffect, useRef } from 'react';

export default function BramptonMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // React 18 Strict Mode runs effects twice in dev.
    // Guard to avoid double-initializing Leaflet on the same div.
    if (initializedRef.current) return;
    initializedRef.current = true;

    const loadCss = () =>
      new Promise<void>((resolve) => {
        const existing = document.querySelector('link[data-leaflet="true"]');
        if (existing) return resolve();

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        link.setAttribute('data-leaflet', 'true');
        link.onload = () => resolve();
        document.head.appendChild(link);
      });

    const loadScript = (src: string, id: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[data-script="${id}"]`);
        if (existing) return resolve();

        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.setAttribute('data-script', id);
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(s);
      });

    const init = async () => {
      await loadCss();
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js', 'leaflet');
      await loadScript('https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js', 'turf');

      const L = (window as any).L;
      const turf = (window as any).turf;

      if (!L || !turf || !mapRef.current) {
        console.error('Leaflet or Turf failed to load.');
        return;
      }

      // If Leaflet left an internal id on the div from a prior mount, clear it
      // (prevents "Map container is already initialized" edge cases)
      (mapRef.current as any)._leaflet_id = undefined;

      const map = L.map(mapRef.current, { preferCanvas: true }).setView([43.65, -79.65], 10);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // ✅ Authoritative Peel municipal boundary layer (3 features: Caledon, Brampton, Mississauga)
      // Query REG_NAME='Peel' and request GeoJSON in EPSG:4326
      const peelQueryUrl =
        'https://services6.arcgis.com/ONZht79c8QWuX759/arcgis/rest/services/School/FeatureServer/1/query' +
        '?where=' + encodeURIComponent("REG_NAME='Peel'") +
        '&outFields=' + encodeURIComponent('MUN_NAME,REG_NAME') +
        '&outSR=4326' +
        '&returnGeometry=true' +
        '&f=geojson';

      let geojson: any;
      try {
        const resp = await fetch(peelQueryUrl);
        if (!resp.ok) throw new Error(`Boundary fetch failed: ${resp.status} ${resp.statusText}`);
        geojson = await resp.json();
      } catch (e) {
        console.error('Failed to fetch Peel boundary GeoJSON:', e);
        return;
      }

      if (!geojson?.features?.length) {
        console.error('Peel boundary GeoJSON is empty or malformed:', geojson);
        return;
      }

      // Dissolve into one outline (optional but matches your "single border" intent)
      let dissolved = geojson.features[0];
      for (let i = 1; i < geojson.features.length; i++) {
        const next = geojson.features[i];
        const merged = turf.union(dissolved, next);
        if (!merged) {
          console.warn('turf.union returned null; falling back to multi-feature display.');
          dissolved = null;
          break;
        }
        dissolved = merged;
      }

      const layerToDraw = dissolved ?? geojson;

      const peelLayer = L.geoJSON(layerToDraw, {
        style: {
          color: '#dc2626',
          weight: 3,
          opacity: 1,
          fill: false,
          stroke: true,
        },
        onEachFeature: (_feature: any, layer: any) => {
          layer.bindPopup(
            '<strong>Peel Region, ON</strong><br>Brampton • Mississauga • Caledon<br>Service Area'
          );
        },
      }).addTo(map);

      const bounds = peelLayer.getBounds();
      if (bounds?.isValid?.()) map.fitBounds(bounds, { padding: [40, 40] });
    };

    init();

    return () => {
      // Cleanup Leaflet map on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      initializedRef.current = false;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-96 rounded-lg border-2 border-gray-300 bg-gray-100" />;
}
