import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileTransferObject,FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IdeaService , Idea} from '../services/idea.service';
@Component({
  selector: 'app-messagem',
  templateUrl: './messagem.page.html',
  styleUrls: ['./messagem.page.scss'],
})
export class MessagemPage implements OnInit {
  base64img: string;
  message: string;
  titulo:string;
  data: string;
    link: string;
  toposelecionado: any = null;
  uploadtopo: string = null;
  selecionado :string;
  empresa = [];
  img: string;
  imgselecionado: any = null;
  setorselecionado: string;
  setor = [];
  uploadlogo: string = null;

  supervidoresselecionado: string;
  supervisor = [];
  supervisor2 :string;
  coordenadoresselecionado: string;
  coordenador = [];

  clienteselecionado: string;
  setorselect: string;
  listas = [];
  listasetor = [];
  listasupervidores = [];
  listacoordenador = [];
  private ideas: Observable<Idea[]>;
  numero: string;
  constructor(   private transfer: FileTransfer,
    private camera: Camera,
    private menuCtrl: MenuController,
    private afs: AngularFirestore,
    private ideaService: IdeaService,
    private service: IdeaService,
    private nav: NavController,
    ) { }

  ngOnInit() {
    this.ideaService.setor().subscribe(res => {

      this.listasetor= res;

    
      })
  }

  abrirmenu(){
    this.menuCtrl.toggle();
  
    
  }

  async pegaImage(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 800,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
     }
  
     this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
   }),error=>{
    alert("error");
   })
  }
 
  // PUXANDO SUPERVISOR DE ACORDO COM A EMPRESA E SETOR SELECIONADO
  puxarsupervisor(supervisor){
    console.log(supervisor.detail.value)
    this.supervisor2 =supervisor.detail.value;
  
  


      this.ideaService.supervesor( supervisor.detail.value).subscribe(res => {

        this.listasupervidores= res;
       
       });

   

  }

    puxarcoordenador(coordeandor){

     console.log(coordeandor.detail.value)
      this.ideaService.coordenador( this.supervisor2,  coordeandor.detail.value).subscribe(res => {

        this.listacoordenador= res;
     
       });

    }

  async enviarServer(dados){

     console.log(this.setorselecionado)

     if(this.setorselecionado==undefined){
      this.setorselecionado = 'Geral';
      this.coordenadoresselecionado = 'Geral';
      this.supervidoresselecionado = 'Geral';
     console.log(this.setorselecionado)
     }

      let id = this.afs.createId();
      let criacao = new Date();
      let categoria =  'mensagem';
      this.data = new Date().toString();
      this.numero = Math.floor(Math.random() * 1000000).toString();
      this.afs.collection<Idea>('Mensagens').doc(id ).set({
          criacao: criacao,
          id: id,
          link: this.link,
          setor:this.setorselecionado,
          coordenacao: this.coordenadoresselecionado,
          supervisor: this.supervidoresselecionado,
          categoria: categoria,
          data: this.data,
          mensagem: this.message,
          titulo: this.titulo,
          img:'https://temtudo.tv.br/imagens/'+ this.numero+'.jpg',
      }
  )  
 
   
 

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "photo",
      fileName: this.numero+".jpg",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.base64img, 'https://temtudo.tv.br/uploads.php', options,).then(data => {
      alert('Mensagem enviada com sucesso!');
     
    }, error => {
      alert("error");
      alert("error" + JSON.stringify(error));
     
    });

    this.service.funcionario().subscribe(res => {
      let categoria =  'mensagem';
      let compartilhou = 'Não'
        let whats = 'Não'
        let face = 'Não'
        let insta = 'Não'
     for( let nao of res){
  
       this.afs.collection<Idea>('Mensagens Compartilhadas').doc(id+nao.id).set({
  
          id: nao.id,
          idmsg: id,
          idgeral: id+nao.id,
          nome: nao.colaborador,
          telefone: nao.telefone,
          compartilhou: compartilhou,
          categoria: categoria,
          criacao: criacao,
          titulo: this.titulo,
          coordenador: nao.coordenador,
          datawhats: '',
          whats: whats,
          facebook: face,
          dataface: '',
          instagram: insta,
          datainsta: '',
  
     });
  
     }
    })
  
     
    this.nav.navigateForward(['home/']);
  }
}
