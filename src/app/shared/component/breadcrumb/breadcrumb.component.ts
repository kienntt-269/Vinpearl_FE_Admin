import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() listBreadCrumb: any = [];
  constructor(
    private route: Router,
  ) { }

  ngOnInit(): void {
    // console.log(this.listBreadCrumb);
  }

  backToDashboard() {
    this.route.navigate(["pages/revenue"]);
  }

}
