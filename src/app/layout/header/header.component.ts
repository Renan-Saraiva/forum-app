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
    { id: "default", name: "Mais antigas" },
    { id: "createdAt", name: "Mais recentes" },
    { id: "likes", name: "Mais curtidas" }
  ];
  
  public orderBy = this.orderOptions[0].id;  
  public text = undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  public OrderByChange(value) {
    this.orderBy = value;
    this.Pesquisar();
  }

  public OsSearch(form: NgForm) {
    this.text = form.value.text;
    this.Pesquisar();
  }

  public Pesquisar(text?: string) {
    const query: any = {
      queryParams: { }
    };
    
    if (this.orderBy != "default")
      query.queryParams.orderBy = this.orderBy ;

    if (this.text)
      query.queryParams.text = this.text;

    this.router.navigate(['/home'], query);
  }
}
