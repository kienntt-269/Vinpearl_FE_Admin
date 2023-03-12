import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';

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
  constructor(
    private route: ActivatedRoute,
    private msg: NzMessageService
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
      }
    });
  }

  formGroup: FormGroup = new FormGroup({
    roomName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    numberName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(12),
      ],
    }),
    acreage: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(REGEX_PATTERN.EMAIL),
      ],
    }),
    numberParent: new FormControl(0, {}),
    numberChildren: new FormControl(0, {}),
    price: new FormControl(0, {}),
    status: new FormControl(0, {}),
    buildingId: new FormControl(0, {}),
    roomGroupType: new FormControl(0, {}),
    roomType: new FormControl(0, {}),
    description: new FormControl(0, {}),
  });

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

}
