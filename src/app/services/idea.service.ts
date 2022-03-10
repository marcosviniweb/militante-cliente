
import { HomePage } from './../home/home.page';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export interface Idea {
  id : '',
  nome:'',
  setor: '',
  img: '',
  lat:'',
  long: '',
  funcao: '',
  senha: '',  
  colaborador: '',
  coordenador:'',
  telefone: '',
  cliente:'',
 
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {


  private ideas: Observable<Idea[]>;
  private ideaCollection: AngularFirestoreCollection<Idea>;

  constructor(private afs: AngularFirestore) {
    this.ideaCollection = this.afs.collection<Idea>('Colaborador/')
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  colaborador(data: string){

    this.ideaCollection = this.afs.collection<Idea>('Colaborador/')
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    var ordenacao =  this.afs.collection<Idea>( "Colaborador", ref => ref.where('id', '==', data)).valueChanges()
    
    
        return ordenacao ;
      }

  pegarempresas(){

var ordenacao =  this.afs.collection<Idea>( "Colaborador").valueChanges()


    return ordenacao ;
  }
  funcionario(){

    this.ideaCollection = this.afs.collection<Idea>('Colaborador/')
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    var ordenacao =  this.afs.collection<Idea>( "Colaborador").valueChanges()
    
    
        return ordenacao ;
      }

      supervesor(setor: string){

        this.ideaCollection = this.afs.collection<Idea>('Supervisores/')
        this.ideas = this.ideaCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );

        
    
        var ordenacao =  this.afs.collection<Idea>( "Supervisores", ref => ref.where('setor', '==', setor)).valueChanges()
        
        
            return ordenacao ;
          }

          mensagensgeral(msg: string ){
            let data = "mensagem";
        var ordenacao2 =  this.afs.collection<Idea>( "Mensagens", ref => ref.where('cliente', '==', msg ).orderBy("criacao", "desc")).valueChanges()
        
        
            
            return ordenacao2;
          }
          
          coordenador( setor: string, supervisor: string){

            this.ideaCollection = this.afs.collection<Idea>('Coordenadores/')
            this.ideas = this.ideaCollection.snapshotChanges().pipe(
              map(actions => {
                return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data };
                });
              })
            );
    
            
        
            var ordenacao =  this.afs.collection<Idea>( "Coordenadores" , ref => ref.where('setor', '==', setor).where('supervisor', '==', supervisor)).valueChanges()
            
            
                return ordenacao ;
              }

              setor( ){

                this.ideaCollection = this.afs.collection<Idea>('Setor/')
                this.ideas = this.ideaCollection.snapshotChanges().pipe(
                  map(actions => {
                    return actions.map(a => {
                      const data = a.payload.doc.data();
                      const id = a.payload.doc.id;
                      return { id, ...data };
                    });
                  })
                );
        
                
            
                var ordenacao =  this.afs.collection<Idea>( "Setor" ).valueChanges()
                
                
                    return ordenacao ;
                  }
    
              
  pegarliberais(data: string){

    this.ideaCollection = this.afs.collection<Idea>('Liberais/')
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    var ordenacao =  this.afs.collection<Idea>( "Liberais", ref => ref.where('categoria', '==', data)).valueChanges()
    
    
        return ordenacao ;
      }


      coordenadores(){

        this.ideaCollection = this.afs.collection<Idea>('Coordenadores/')
        this.ideas = this.ideaCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        );
    
        var ordenacao =  this.afs.collection<Idea>( "Coordenadores").valueChanges()
        
        
            return ordenacao ;
          }

          filtrocoord(data: string){

            this.ideaCollection = this.afs.collection<Idea>('Colaborador/')
            this.ideas = this.ideaCollection.snapshotChanges().pipe(
              map(actions => {
                return actions.map(a => {
                  const data = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data };
                });
              })
            );
        
            var ordenacao =  this.afs.collection<Idea>( "Colaborador", ref => ref.where('coordenador', '==', data)).valueChanges()
            
            
                return ordenacao ;
              }

    }

  
    