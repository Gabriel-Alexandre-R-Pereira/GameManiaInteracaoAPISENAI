import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;
  Nome : string | null = localStorage.getItem("UserName");

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Loging Out

  LogOut () {

    localStorage.removeItem("UserName")
  
  }

}
