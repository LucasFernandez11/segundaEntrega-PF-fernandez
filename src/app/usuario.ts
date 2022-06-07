export class Usuario {
    name:string;
  constructor(name:string){
      this.name=name;
  }

  obtenerUsuario(){
    return new Promise((resolve,reject)=>{
      if(this.name){
        return resolve([{name:'username1'}]);
      }
      return reject({message: 'error'});
    })
  }


}
