import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';
import * as consts from '../common/constants';

/**
 * Get a static image from google map
 * @param {object} center - { lat: number, lng: number }
 * @param {number} zoom - [1-18] view map zoom
 * @param {object} size - { width: number, height: number }
 * @param {string} apikey - Google Api key
 * @url https://developers.google.com/maps/documentation/static-maps/?hl=es-419
 */
export function getStaticMapImage(center, zoom, size, apikey) {
  const url = `${ consts.GOOGLE_STATIC_MAPS_URL }?center=${ center.lat },${
    center.lng
  }&zoom=${ zoom }&size=${ size.width }x${ size.height }&markers=color:blue|label:T|${ center.lat },${
    center.lng
  }&key=${ apikey }`;
  return fetch(url).then(response => response.blob());
}

/**
 *
 * @param {String} address
 * @param {string} apikey - Google Api key
 * @url https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419
 */
export function geocodeAddress(address, apikey) {
  const encodedURI = window.encodeURI(address);
  const url = `${ consts.GOOGLE_MAPS_GEOCODE_URL }?address=${ encodedURI }&key=${ apikey }`;
  return fetch(url)
    .then(response => response.json())
    .then(coors => _.get(coors, 'results[0].geometry.location'));
}

export async function renderDynamicMap($map, google, zoom, center) {
  const map = new google.maps.Map(_.get($map, '[0]'), {
    gestureHandling: 'cooperative',
    zoom,
    center,
  });
  const marker = new google.maps.Marker({
    position: center,
    map,
  });
  marker.setMap(map);
  return map;
}

export async function initAutoCompleteAddressInput($autoCompleInput, google, onChangeCallBack) {
  const autocomplete = new google.maps.places.Autocomplete(_.get($autoCompleInput, '[0]'), {
    types: ['geocode'],
  });
  autocomplete.addListener('place_changed', onChangeCallBack);
  return autocomplete;
}

export function loadGoogleMaps(apikey, libraries) {
  GoogleMapsLoader.KEY = apikey;
  GoogleMapsLoader.LIBRARIES = libraries;
  return new Promise(resolve => {
    GoogleMapsLoader.load(function (google) {
      resolve(google);
    });
  });
}
