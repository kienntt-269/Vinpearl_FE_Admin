import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() changeItemPerPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeCurrentPage: EventEmitter<number> = new EventEmitter<number>();      // Gửi currentPage lên cho parent component


}
