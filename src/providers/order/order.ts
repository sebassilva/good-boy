import { Injectable } from '@angular/core';

@Injectable()
export class OrderProvider {

 userId: string
 pets: string
 serviceId: string
 payment: string
 location: string
 address: string


  constructor() {
    console.log('Hello OrderProvider Provider');
    this.payment = "default"
  }

  setUserId(userId){
    this.userId = userId
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
       service_id: this.serviceId, 
       payment: 'default', 
       location: this.location, 
       addres: this.address
    }
  }
}
