import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isloggedIn: boolean;
  loggedInUser: string;

  constructor(private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(){
    this.loginService.getAuth().subscribe(
      auth => {
        if(auth){
          this.isloggedIn =true;
          this.loggedInUser = auth.email;
        } else {
          this.isloggedIn = false;
        }
      }
    )
  }

  logOut(){
    this.loginService.logOut();
    this.isloggedIn = false;
    this.router.navigate(['/login']);
  }

}
