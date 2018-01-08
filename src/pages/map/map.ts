import { Component , ViewChild, ElementRef, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ChooseDogPage } from '../choose-dog/choose-dog';
import { OrderInfoModalPage } from '../order-info-modal/order-info-modal';

import { Geolocation } from '@ionic-native/geolocation';
import { OrderProvider } from '../../providers/order/order';

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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public geolocation: Geolocation, 
    private ngZone: NgZone, 
    public order: OrderProvider,
    public modalCtrl: ModalController){
      this.isProvider = this.navParams.get('isProvider')
  }

  viewOrder(){
    let order = {
      isProvider: this.isProvider,
      id: this.navParams.get('id'),
      address: this.navParams.get('address'), 
      lat: this.navParams.get('lat'), 
      lng: this.navParams.get('lng'), 
      pet: this.navParams.get('pet'), 
      service: this.navParams.get('service'), 
    }

    this.presentOrderModal(order)
  }



  ionViewDidLoad() {
    this.loadMap();
    if(this.navParams.get('id')){

      this.isProvider = true
    }
    console.log(this.navParams.get(''))
  }


















    /*aux functions for map */

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {
      
      //Initial configuration
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
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
      this.location = {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()}
      this.getReverseGeocodingData(position.coords.latitude, position.coords.longitude)

      this.map.addListener('center_changed', _ =>{
        this.location =  {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()}
        this.getReverseGeocodingData(this.location.lat, this.location.lng)


      })
 
    }, (err) => {
      console.log(err);
    });
  }


  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    let content = "<h4>Information!</h4>";         
    this.addInfoWindow(marker, content);
  }


  addInfoWindow(marker, content){

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
    geocoder.geocode({ 'latLng': latlng },  (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            this.ngZone.run(() =>  this.updateAddress((results[0].formatted_address)))
           
            console.log(this.address)
        }
    });
  }


  updateAddress(address){
    this.address = address
  }


  next(){
    if(this.address){
      this.order.setAddress(this.address)
      this.order.setLocation(this.location)
      this.navCtrl.push(ChooseDogPage)
    }else{
      console.log("No se ha seleccionado ninguna dirección")
    }
    
  }


  presentOrderModal(order) {
    let orderModal = this.modalCtrl.create(OrderInfoModalPage, order);
    orderModal.present();
  }
}
