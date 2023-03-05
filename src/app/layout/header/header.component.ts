import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() status = new EventEmitter();
  isExpand = false;
  myInterval: any;
  lstBooking: any[] = [];
  countNotRead: number = 0;
  isRingBell: boolean = false;
  isShowBooking: boolean = false;
  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.startTime();
  }

  toggleSidebar() {
    this.isExpand = !this.isExpand;
    this.status.emit(this.isExpand);
  }

  startTime() {
    this.myInterval = setInterval(() => {
      const today = new Date();
      if (document && document.getElementById('txt')) {
        // @ts-ignore
        document.getElementById('txt').innerHTML = moment(today).format('HH:mm:ss');
      }
    }, 1000)
  }

  assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !("nodeType" in e)) {
      throw new Error(`Node expected`);
    }
  }

  showWarning() {
    this.isShowBooking = !this.isShowBooking;
    this.renderer.listen('window', 'click', (e: Event) => {
      this.assertIsNode(e.target);
      if (!document.getElementById("btn-show-warning")?.contains(e.target) && !document.getElementById("warning-content")?.contains(e.target)) {
        this.isShowBooking = false;
      }
    });
  }

}
