import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChooseDogPage } from '../choose-dog/choose-dog';
import { OrderInfoModalPage } from '../order-info-modal/order-info-modal';

import { Geolocation, Geoposition, PositionError } from '@ionic-native/geolocation';
import { OrderProvider } from '../../providers/order/order';
import { ApiProvider } from '../../providers/api/api';

declare var google


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  address: string
  location: any
  isProvider: boolean
  currentOrder: any
  positionMarker: any
  currentPosition: any


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    private ngZone: NgZone,
    public order: OrderProvider,
    public modalCtrl: ModalController, 
    public api: ApiProvider) {


    this.isProvider = this.navParams.get('isProvider')
    this.positionMarker = null
    this.currentOrder = {
      isProvider: this.isProvider,
      id: this.navParams.get('id'),
      address: this.navParams.get('address'),
      lat: this.navParams.get('lat'),
      lng: this.navParams.get('lng'),
      pet: this.navParams.get('pet'),
      service: this.navParams.get('service'),
    }

  }


  viewOrder() {
    this.presentOrderModal(this.currentOrder)
  }


  ionViewDidLoad() {
    if (this.navParams.get('id')) {
      this.isProvider = true
    }
    this.loadMap();
  }


  loadProviderConfig() {
    console.log('provider config', this.isProvider)
    if (this.isProvider) {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      let latLng = new google.maps.LatLng(parseFloat(this.currentOrder.lat), parseFloat(this.currentOrder.lng))
      directionsDisplay.setMap(this.map);

      //Add marker for order and display route
      this.addMarker(latLng)
      this.calculateAndDisplayRoute(directionsService, directionsDisplay)
      setInterval(() => { this.autoUpdatePosition() }, 5000)
    }
  }


  loadUserConfig(position){
    if(!this.isProvider){
      console.log('provider config', this.isProvider)
      this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude)
      this.map.addListener('center_changed', _ => {
        this.location = { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() }
        this.getReverseGeocodingData(this.location.lat, this.location.lng)
      })
    }

  }



















  /*************aux functions for map *************/

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      //Initial configuration
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.currentPosition = latLng


      let mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      }


      //Init map and listeners
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
      this.location = { lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() }

      //If is user and willing to get its direction

      this.loadProviderConfig()
      this.loadUserConfig(position)

    }, (err) => {
      console.log(err);
    });


  }


  addMarker(position) {
    console.log('adding marter')
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }


  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }


  getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        alert(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
        this.ngZone.run(() => this.updateAddress((results[0].formatted_address)))

        console.log(this.address)
      }
    });
  }


  updateAddress(address) {
    this.address = address
  }


  next() {
    if (this.address) {
      this.order.setAddress(this.address)
      this.order.setLocation(this.location)
      this.navCtrl.push(ChooseDogPage)
    } else {
      console.log("No se ha seleccionado ninguna dirección")
    }

  }


  presentOrderModal(order) {
    let orderModal = this.modalCtrl.create(OrderInfoModalPage, order);
    orderModal.present();
  }


  autoUpdatePosition() {
    this.geolocation.getCurrentPosition().then((position) => {
      let data = {
        user_id: this.order.getUserId(), 
        lat: position.coords.latitude, 
        lng: position.coords.longitude
      }
      this.api.post('provider/updateLocation/' + data.user_id, data).subscribe(data => {
        data = data.json()
        console.log(data)
      })
    })
  }


  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    console.log({
      origin: {lat: this.currentPosition.lat(), lng: this.currentPosition.lng()},
      destination: {lat: parseFloat(this.currentOrder.lat), lng: parseFloat(this.currentPosition.lng)},
      travelMode: 'DRIVING'
    })
    directionsService.route({
      origin: {lat: this.currentPosition.lat(), lng: this.currentPosition.lng()},
      destination: {lat: parseFloat(this.currentOrder.lat), lng: parseFloat(this.currentOrder.lng)},
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
