import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/service/loading.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  loading$ = this.loader.loading$;
  status: any;
  constructor(
    private loader: LoadingService,
  ) { }

  ngOnInit(): void {

  }

  childToParent(event: any) {
    this.status = event;
    console.log(event);
  }
}
