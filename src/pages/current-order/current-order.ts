import { Component, ViewChild, ElementRef, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ApiProvider } from '../../providers/api/api';

declare var google

@IonicPage()
@Component({
  selector: 'page-current-order',
  templateUrl: 'current-order.html',
})
export class CurrentOrderPage {
  @ViewChild('map') mapElement: ElementRef;


  map: any;
  location: any
  currentPosition: any
  currentOrder: any
  positionInterval: any
  providerPostitionMarker: any

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,     
    public geolocation: Geolocation,
    public api: ApiProvider
  ) {
    this.loadMap()
    this.currentOrder = {
      id: this.navParams.get('id'), 
      user_id: this.navParams.get('user_id'), 
      service: this.navParams.get('service'),  
      lat: this.navParams.get('lat'), 
      lng: this.navParams.get('lng'), 

   }

   this.positionInterval = setInterval(() => { this.updateProviderPosition() }, 5000)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentOrderPage');
  }









  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      //Initial configuration
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.currentPosition = latLng


      let mapOptions = {
        center: latLng,
        zoom: 10,
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
      this.updateProviderPosition()
      this.userLocation(latLng)



    }, (err) => {
      console.log(err);
    });


  }




  addMarker(position, message) {
    console.log('adding marter')
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    this.addInfoWindow(marker, message);
  }


  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }


  userLocation(latLng){
    this.addMarker(latLng, 'Tu posición actual')
  }


  updateProviderPosition(){
    let postData = {
      id: this.currentOrder, 
      user_id: this.currentOrder.user_id
    }
    this.api.post('order/getCurrentStatus', postData)
    .map(res => res.json())
    .subscribe(order => {
      this.currentPosition = {lat: parseFloat(order.data.lat), lng: parseFloat(order.data.lng)}
      let latLng = new google.maps.LatLng(this.currentPosition.lat, this.currentPosition.lng)




      if(this.providerPostitionMarker){
        console.log('not providerpositionMarker')
        console.log(this.currentPosition)
        this.providerPostitionMarker.setPosition(latLng)

      }else{
        console.log('yes providerpositionMarker')
        console.log(this.currentPosition)

        this.providerPostitionMarker = new google.maps.Marker({
          map: this.map,
          position: latLng, 
          visible: true
        });
        let content = "<h4>Aquí está tu mascota :)</h4>";
        this.addInfoWindow(this.providerPostitionMarker, content);

      }
    })
  }


  viewWillDiseappear(){
    if (this.positionInterval)
      clearInterval(this.positionInterval)
  }


  viewWillLeave(){
    if (this.positionInterval)
      clearInterval(this.positionInterval)
  }
}
