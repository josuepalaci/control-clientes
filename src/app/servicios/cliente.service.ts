import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Cliente } from "../modelo/cliente.model";
import { map } from "rxjs/operators";

@Injectable()
export class ClienteServicio{

    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente>;

    constructor(
        private db: AngularFirestore
    ){
        this.clientesColeccion = db.collection('cliente', ref => ref.orderBy('nombre','asc'));
    }

    getClientes(): Observable<Cliente[]>{
        //obteniendo clientes
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios => {
                return cambios.map( accion => {
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes
    }


}