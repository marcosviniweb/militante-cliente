import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavController, IonSlides, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import {  MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IdeaService } from '../services/idea.service';
import { Environment, GoogleMap, GoogleMaps } from '@ionic-native/google-maps';
import { title } from 'process';
import { preserveWhitespacesDefault } from '@angular/compiler';
declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  map:any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
id:string;
setor: string;
selecionar: any;
lat  :any;
registros = [];
listcoord = [];
markers = [];
long :any;
img: string;
icon: string;
telefone: string;
mapMarker:any;
  infoWindows: any = [];
  coordenador: string;
  name: any;
  lat1: any;
  long1: any;
  coordenadores : any;
  constructor(
    private authService: AuthService,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private service: IdeaService,
    private geolocation: Geolocation,
    private menuCtrl: MenuController
  ) {}
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  abrirmenu(){
    this.menuCtrl.toggle();
  
    
  }


ionViewDidEnter(){
  setTimeout(() =>{
    this.showMap();
    
  }, 1000);

}
ngOnInit() {
  let id =  this.authService.getAuth().currentUser.uid
 
   this.geolocation.getCurrentPosition().then((resp) => {
     this.lat = resp.coords.latitude;
     this.long =  resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
 
   this.id = this.afs.createId.toString();
   setInterval(() => {
 
   let aleatorio = Math.floor(Math.random() * 12);
   this.afs.collection('Supervisores').doc(id).update({lat:this.lat, long:this.long});
   console.log(aleatorio);
 }, 120000);
 
 
 this.service.pegarempresas().subscribe(res => {
         
   this.registros = res;
   for(let mark of this.registros){
     this.img = mark.img;
     this.icon = mark.icon;
    this.name = mark.colaborador;
    this.telefone = mark.telefone;
    this.coordenador = mark.coordenador;
    this.setor = mark.setor;
    this.lat1=parseFloat(mark.lat);
    this.long1=parseFloat(mark.long);
    console.log(mark.lat);
    this.markers = [
      {
      title: this.name,
      subtitle: this.coordenador,
      img: this.img,
      icon: this.icon,
      telefone: this.telefone,
      setor: this.setor,
      latitude: this.lat1,
      longitude: this.long1
      }
    ];
    this.addMarkersToMap(this.markers);
   }
   console.log(this.registros)
   
 });
 console.log('resgistros '+this.name);
 

  this.service.coordenadores().subscribe(res => {
      this.listcoord = res;
     
     
  });

 }
 teste(){
   console.log('testou')
 }
 filtro(event){
  this.showMap();
  console.log(event.detail.value)
  if(event.detail.value != 'Sem Filtro'){
    this.service.filtrocoord(event.detail.value).subscribe(res => {
      this.registros = res; 
      for(let mark of this.registros){
        this.img = mark.img;
       this.name = mark.colaborador;
       this.telefone = mark.telefone;
        this.icon = mark.icon;
       this.coordenador = mark.coordenador;
       this.setor = mark.setor;
       this.lat1=parseFloat(mark.lat);
       this.long1=parseFloat(mark.long);
       console.log(mark.lat);
       this.markers = [
         {
         title: this.name,
         subtitle: this.coordenador,
         img: this.img,
         icon: this.icon,
         telefone: this.telefone,
         setor: this.setor,
         latitude: this.lat1,
         longitude: this.long1
         }
       ];
       this.addMarkersToMap(this.markers);
      }
      console.log(this.registros)
  });

  }else{
    this.service.pegarempresas().subscribe(res => {
         
      this.registros = res;
      for(let mark of this.registros){
        this.img = mark.img;
        this.icon = mark.icon;
       this.name = mark.colaborador;
       this.telefone = mark.telefone;
       this.coordenador = mark.coordenador;
       this.setor = mark.setor;
       this.lat1=parseFloat(mark.lat);
       this.long1=parseFloat(mark.long);
       console.log(mark.lat);
       this.markers = [
         {
         title: this.name,
         subtitle: this.coordenador,
         telefone:   this.telefone,
         img: this.img,
         icon: this.icon,
         setor: this.setor,
         latitude: this.lat1,
         longitude: this.long1
         }
       ];
       this.addMarkersToMap(this.markers);

      }
      console.log(this.registros)
      
    });

  }



 }
addMarkersToMap(markers) {
  for (let marker of markers) {
    let position = new google.maps.LatLng(marker.latitude, marker.longitude);
    this.mapMarker = new google.maps.Marker({
      position: position,
      title: marker.title,
      img: marker.img,
     
      telefone: marker.telefone,
      setor: marker.setor,
      subtitle: marker.subtitle,
      icon: "../assets/img/"+marker.icon,
      latitude: marker.latitude,
      longitude: marker.longitude,
      animation: google.maps.Animation.DROP
    });

    this.mapMarker.setMap(this.map);
    this.addInfoWindowToMarker(this.mapMarker);
  }
}

addInfoWindowToMarker(marker) {
  let infoWindowContent = '<div id="content">' +
                            '<h2 id="firstHeading" class"firstHeading">Apelido: ' + marker.title + '</h2>' +
                            ' <img width = "100%" src = "'+ marker.img +'" />' + 
                            '<p><b>Coordenador:</b> ' + marker.subtitle + '</p>' +
                            '<p><b>Telefone:</b> ' + marker.telefone + '</p>' +
                            '<p><b>Setor:</b> ' + marker.setor + '</p>' +
                          
                          '</div>';

  let infoWindow = new google.maps.InfoWindow({
    content: infoWindowContent
  });

  marker.addListener('click', () => {
    this.closeAllInfoWindows();
    infoWindow.open(this.map, marker);
  });
  this.infoWindows.push(infoWindow);
}

closeAllInfoWindows() {
  for(let window of this.infoWindows) {
    window.close();
  }
}

showMap() {
  const location = new google.maps.LatLng(this.lat, this.long);
  const options = {
    center: location,
    zoom: 15,
    disableDefaultUI: true
  }
  this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  
}
 
}
