import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';
import { HotelService } from 'src/app/core/service/hotel-management/hotel.service';
import { ToastrService } from 'ngx-toastr';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-save-hotel',
  templateUrl: './save-hotel.component.html',
  styleUrls: ['./save-hotel.component.scss']
})
export class SaveHotelComponent implements OnInit {

  fileToUpload: any;
  fileListName: any[] = [];
  selectedFile: any;
  listOfSite: any[] = [];
  
  roomId: any;
  breadcrumb: any = [];
  loading = false;
  avatarUrl?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private hotelService: HotelService,
    private toast: ToastrService
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
        this.getDetailHotel(this.roomId);
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

    this.hotelService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
    })
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    area: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    site: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    phone: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    totalRoom: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(REGEX_PATTERN.EMAIL),
      ],
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    address: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    // uploadFile: new FormControl('', {
    //   validators: [
    //     Validators.required,
    //   ],
    // })
  });

  previewImage: string | undefined = '';
  previewVisible = false;

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  getDetailHotel(id: any) {
    this.hotelService.hotelDetail(id).subscribe(res => {

      if (res.code == 200) {
        const data = res.data;
        this.formGroup.setValue({
          name: data.name,
          area: data.area,
          site: data.siteId,
          phone: data.phone,
          totalRoom: data.totalRoom,
          email: data.email,
          description: data.description,
          address: data.address,
          // uploadFile: data.uploadFile,
        })
      }
    })
  }

  handleAddHotel() {
    const formValue = this.formGroup.value;
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }
    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("email", formValue.email);
    formData.append("description", formValue.description);
    formData.append("address", formValue.address);
    formData.append("phone", formValue.phone);
    formData.append("totalRoom", formValue.totalRoom);
    formData.append("area", formValue.area);
    formData.append("siteId", formValue.site);
    // formData.append("images", formValue.uploadFile);
    for (let index = 0; index < this.selectedFile.length; index++) {
      formData.append("images", this.selectedFile[index]);
    }

    this.hotelService.addHotel(formData).subscribe(res => {
      console.log(res.body);
      if (res.body?.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/hotel-management']);
      }
      if (res.body?.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.body?.code == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }

  onCancel() {
    this.router.navigate(['/pages/hotel-management']);
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files;
    this.fileListName = [];
    for (let index = 0; index < this.selectedFile.length; index++) {
      this.fileListName.push(this.selectedFile[index].name);
    }
  }

}
