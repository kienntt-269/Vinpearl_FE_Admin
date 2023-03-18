import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';
import { RoomService } from 'src/app/core/service/room-management/room.service';
import { ToastrService } from 'ngx-toastr';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-save-room',
  templateUrl: './save-room.component.html',
  styleUrls: ['./save-room.component.scss']
})
export class SaveRoomComponent implements OnInit {

  roomId: any;
  breadcrumb: any = [];
  loading = false;
  avatarUrl?: string;
  listOfHotel: any[] = [];
  listOfRoomType: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['id'];
      if (this.roomId) {
        this.breadcrumb = [
          {
            name: "Quản lý đặt phòng",
            // route: "/pages/room-booking"
          },
          {
            name: "Cập nhật phòng",
            // route: "/pages/room-booking"
          }
        ]
      } else {
        this.breadcrumb = [
          {
            name: "Quản lý đặt phòng",
            // route: "/pages/room-booking"
          },
          {
            name: "Thêm mới phòng",
            // route: "/pages/room-booking"
          }
        ]

        this.getListHotel();
      }
    });
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    roomGroupType: new FormControl(0, {}),
    hotel: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    roomType: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  changeHotel(id: any) {
    this.getListRoomType(id);
  }

  getListHotel() {
    this.roomService.getListHotel().subscribe(res => {
      if (res.code === 200) {
        this.listOfHotel = res.data;
      }
    })
  }

  getListRoomType(hotelId: any) {
    this.roomService.getListRoomType(1000, 0, "id,desc", hotelId, "", "").subscribe(res => {
      if (res.code === 200) {
        this.listOfRoomType = res.data.content;
      }
    })
  }

  onCancel() {
    this.router.navigate(['/pages/room-management/room']);
  }

  handleAddRoom() {
    const formValue = this.formGroup.value;
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }

    const data = {
      name: formValue.name,
      roomGroupType: formValue.roomGroupType,
      roomTypeId: formValue.roomType,
      description: formValue.description,
      status: 0,
    }

    this.roomService.addRoom(data).subscribe(res => {
      if (res.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/room-management/room']);
      }
      if (res.body?.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.body?.code == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }
}
