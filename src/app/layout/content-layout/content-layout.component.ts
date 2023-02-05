import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  status: any;
  constructor() { }

  ngOnInit(): void {

  }

  childToParent(event: any) {
    this.status = event;
    console.log(event);
  }
}
