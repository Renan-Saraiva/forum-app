import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public orderOptions = [
    { id: "createdAt", name: "Mais recentes" },
    { id: "likes", name: "Mais curtidas" }
  ];
  public orderBy = this.orderOptions[0].id;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  public OrderByChange(value) {
    this.orderBy = value;
  }  

  public Pesquisar(form: NgForm) {
    let query: any = {
      queryParams: {
        orderBy: this.orderBy
      }
    };
    
    if (form.value.text)
      query.queryParams.text = form.value.text;

    this.router.navigate(['/home'], query);
  }
}