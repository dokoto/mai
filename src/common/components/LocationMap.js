import _ from 'lodash';
import GoogleMapsLoader from 'google-maps';
import * as consts from '../constants';

export default class LocationMap {
  /**
   * @public
   * @param {string} apikey - Google Api key
   */
  constructor(apikey, libraries) {
    this.apikey = apikey;
    if (!this.apikey) {
      throw new Error('Google MAP API KEY is mandatory');
    }
    this.libraries = libraries || [];
    this.googleApi = null;
    this.map = null;
    this.center = {};
    this.autocomplete = null;
    this.zoom = null;
    this.$map = null;
    this.$input = null;
    this.marker = null;
  }

  /**
   * @public
   * Intance a ref to Google map library. Mandatory you want dynamics maps
   */
  async activateGoogleMaps() {
    this.googleApi = await this.loadGoogleMapsLibraries();
  }

  /**
   * @public
   * Release the google maps library ref
   */
  releaseGoogleMaps() {
    GoogleMapsLoader.release(console.log('Google API released'));
  }

  /**
   * @public
   * @param {object} Input jquery ref
   */
  activateAutoComplete($input) {
    this.$input = $input;
    this.autocomplete = new this.googleApi.maps.places.Autocomplete(_.get(this.$input, '[0]'), {
      types: ['geocode'],
    });
    this.autocomplete.addListener('place_changed', this.autoCompleteHandler.bind(this));
  }

  /**
   * @public
   * Reajust map on resize events
   */
  resize() {
    this.googleApi.maps.event.trigger(this.map, 'resize');
    this.map.setCenter(new this.googleApi.maps.LatLng(this.center.lat, this.center.lng));
  }

  /**
   *
   * @public
   * @param {object} Element map jquery ref
   * @param {number} zoom
   * @param {string} address
   * @param {String} [gestureHandling=cooperative]
   */
  async renderDynamicMap($map, zoom, address, gestureHandling = 'cooperative') {
    this.$map = $map;
    this.zoom = zoom;
    this.center = await this.geocodeAddress(address);
    this.gestureHandling = gestureHandling;
    this.map = new this.googleApi.maps.Map(_.get(this.$map, '[0]'), {
      gestureHandling: this.gestureHandling,
      zoom: this.zoom,
      center: this.center,
    });
    this.marker = new this.googleApi.maps.Marker({
      position: this.center,
      map: this.map,
    });
    this.marker.setMap(this.map);
  }

  /**
   * @public
   * Get a static image from google map
   * @param {object} center - { lat: number, lng: number }
   * @param {number} zoom - [1-18] view map zoom
   * @param {object} size - { width: number, height: number }
   * @returns {Promise} Image blob
   * [Google maps ref]{@link https://developers.google.com/maps/documentation/static-maps/?hl=es-419}
   */
  getStaticMapImage(center, zoom, size) {
    const url = `${ consts.GOOGLE_STATIC_MAPS_URL }?center=${ center.lat },${
      center.lng
    }&zoom=${ zoom }&size=${ size.width }x${ size.height }&markers=color:blue|label:T|${ center.lat },${
      center.lng
    }&key=${ this.apikey }`;
    return fetch(url).then(response => response.blob());
  }

  /**
   * @public
   * @param {String} address
   * @returns {object} location {lat, lng}
   * [Google maps ref]{@link https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419}
   */
  geocodeAddress(address) {
    const encodedURI = window.encodeURI(address);
    const url = `${ consts.GOOGLE_MAPS_GEOCODE_URL }?address=${ encodedURI }&key=${ this.apikey }`;
    return fetch(url)
      .then(response => response.json())
      .then(coors => _.get(coors, 'results[0].geometry.location'));
  }

  /**
   * @private
   * Autocomple callback handler
   */
  async autoCompleteHandler() {
    const place = this.autocomplete.getPlace();
    await this.renderDynamicMap(this.$map, this.zoom, place.formatted_address);
  }

  /**
   * @private
   * Get a google maps api instance
   * @returns {Promise} Google Api instance
   */
  async loadGoogleMapsLibraries() {
    GoogleMapsLoader.KEY = this.apikey;
    GoogleMapsLoader.LIBRARIES = this.libraries;
    return new Promise(resolve => {
      GoogleMapsLoader.load(function (google) {
        resolve(google);
      });
    });
  }
}