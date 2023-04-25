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
  action: any;
  breadcrumb: any = [];
  loading = false;
  avatarUrl?: string;
  listOfHotel: any[] = [];
  listOfRoomType: any[] = [];
  listOfRoomGroupType: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['id'];
      this.action = params['action'];
      if (this.action == "DETAIL") {
        //disable all input
        Object.keys(this.formGroup.controls).forEach((key) => {
          this.formGroup.get(key)?.disable();
        });
      }
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
        this.getDetailRoom(this.roomId);
        this.listOfRoomGroupType = [
          {
            id: 0,
            name: "Phòng dịch vụ",
          },
          {
            id: 1,
            name: "Phòng đặt tour",
          },
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
      }
      this.getListHotel();
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
    // description: new FormControl('', {
    //   validators: [
    //     Validators.required,
    //   ],
    // }),
  });

  changeHotel(id: any) {
    this.getListRoomType(id);
  }

  getDetailRoom(id: any) {
    this.roomService.roomDetail(id).subscribe(res => {
      if (res.code == 200) {
        const data = res.data;
        this.formGroup.setValue({
          name: data.name,
          roomGroupType: data.roomGroupType,
          hotel: data.roomTypes?.hotelId,
          roomType: data.roomTypeId,
          // description: data.description
        })
      }
    })
  }

  getListHotel() {
    this.roomService.getListHotel().subscribe(res => {
      if (res.code === 200) {
        this.listOfHotel = res.data;
      }
    })
  }

  getListRoomType(hotelId: any) {
    this.roomService.getListRoomTypeByHotelId(hotelId).subscribe(res => {
      if (res.code === 200) {
        this.listOfRoomType = res.data;
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
      // description: formValue.description,
      status: 0,
    }

    if (this.roomId) {
      this.roomService.updateRoom(this.roomId, data).subscribe(res => {
        if (res.code == 200) {
          this.toast.success('Cập nhật phòng thành công');
          this.router.navigate(['/pages/room-management/room']);
        }
      })
    } else {
      this.roomService.addRoom(data).subscribe({
        next: res => {
          this.toast.success('Thành công', 'Thông báo');
          this.router.navigate(['/pages/room-management/room']);
        },
        error: error => {
          if (error.error.detailError.includes("Đã đạt tối đa số lượng phòng cho phép")) {
            this.toast.error('Đã đạt tối đa số lượng phòng cho phép', 'Lỗi');
          }
        }
      })
    }

  }
}
