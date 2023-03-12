import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import * as moment from 'moment';
import { io } from 'socket.io-client';
import constants from 'src/app/core/constants/constants';
import { environment } from 'src/environments/environment.prod';

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
  private socket: any;
  TOPIC_ORDER = 'order';
  TOPIC_CONNECT = 'connect';
  TOPIC_DISCONNECT = 'disconnect';
  constructor(
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.startTime();
  }

  connectSocket() {
    // API socket
    this.socket = io(environment.BASE_PATH_DOMAIN + '/order?token=' + localStorage.getItem(constants.TOKEN), {
      transports: ['polling', 'websocket'],
      path: '/socket.io'
    });
    this.subscribeTopic(this.TOPIC_CONNECT);
  }

  subscribeTopic(topic: string) {
    if (topic == this.TOPIC_CONNECT) {
      this.socket.on(topic, () => {
        this.subscribeTopic(this.TOPIC_DISCONNECT);
        this.subscribeTopic(this.TOPIC_ORDER);
      });
      return;
    }
    if (topic == this.TOPIC_DISCONNECT) {
      this.socket.on(topic, () => {
        console.log('disconnected')
      });
      return;
    }

    if (topic == this.TOPIC_ORDER) {
      this.socket.on(topic, (data: any) => {
        console.log('Received new order: ', data);
      })
    }
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
