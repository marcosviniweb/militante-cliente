import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IdeaService, Idea } from '../services/idea.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-msgrec',
  templateUrl: './msgrec.page.html',
  styleUrls: ['./msgrec.page.scss'],
})
export class MsgrecPage implements OnInit {
  mensagens = [];
  id:string;
  user = [];
 msg: any;
  private ideas: Observable<Idea[]>;
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  constructor(
    private service: IdeaService,
    private menuCtrl: MenuController,
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.id =  this.authService.getAuth().currentUser.uid
    
    this.service.colaborador(this.id).subscribe(res => {
        this.user = res;
       
        for(let mensagem of this.user){
          this.msg =   mensagem.cliente;

        }
        console.log( this.msg)
  this.service.mensagensgeral(this.msg ).subscribe(res => {
    
  
    this.mensagens = res;
  
 
  
  
  
});

        
    });
  
  }

  
  abrirmenu(){
    this.menuCtrl.toggle();
  
    
  }

  deletar(id){
    this.afs.collection<Idea>('Mensagens').doc(id).delete();
    this.service.funcionario().subscribe(res => {
      for( let nao of res){
    this.afs.collection<Idea>('Mensagens Compartilhadas').doc(id+nao.id).delete();
      }
  })
  } 


}
