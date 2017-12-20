import { Injectable } from '@angular/core';

@Injectable()
export class OrderProvider {

 userId: string
 pets: any
 serviceId: string
 payment: string
 location: any
 address: string
 service: any


  constructor() {
    console.log('Hello OrderProvider Provider');
    this.payment = "default"
  }

  setUserId(userId){
    this.userId = userId
  }

  setService(service){
    this.service = service
  }

  setPets(pets){
    this.pets = pets    
  }

  setServiceId(serviceId){
    this.serviceId = serviceId
  }

  setLocation(location){
    this.location = location
  }

  setAddress(address){
    this.address = address
  }



  getPets(){
    return this.pets
  }

  getService(){
    return this.service
  }
  getServiceId(){
    return this.serviceId
  }

  getLocation(){
    return this.location
  }

  getAddress(){
    return this.address
  }

  getUserId(){
    return this.userId
  }

  getOrder(){
    return {
       user_id: this.userId, 
       pets: this.pets, 
       service: this.service, 
       payment: 'default', 
       location: this.location, 
       address: this.address
    }
  }
}
