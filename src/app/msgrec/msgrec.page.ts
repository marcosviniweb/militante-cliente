import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IdeaService, Idea } from '../services/idea.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-msgrec',
  templateUrl: './msgrec.page.html',
  styleUrls: ['./msgrec.page.scss'],
})
export class MsgrecPage implements OnInit {
  mensagens = [];
  private ideas: Observable<Idea[]>;

  constructor(
    private service: IdeaService,
    private menuCtrl: MenuController,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {

    this.service.mensagensgeral( ).subscribe(res => {

      this.mensagens = res;
     
    
  });
  
  
  }

  
  abrirmenu(){
    this.menuCtrl.toggle();
  
    
  }

  deletar(id){
    this.afs.collection<Idea>('Mensagens').doc(id).delete();
  } 


}
