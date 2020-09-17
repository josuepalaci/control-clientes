import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from "../../servicios/cliente.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
        clientes => {
        this.clientes = clientes;
        // console.log(clientes);
      }
    );
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
        this.clientes.forEach(cliente => {
          saldoTotal += cliente.saldo;
        });
      }
      return saldoTotal;
  }

  agregar({value, valid}: {value:Cliente, valid: boolean}){
    if (!valid) {
      this.flashMessages.show('porfavor llenaló correctamente', {
        cssClass: 'alert-danger', timeout: 2500
      });
    }
    else {
      // agregar un nuevo componente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
