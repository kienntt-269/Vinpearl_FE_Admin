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
import {NzCarouselComponent} from 'ng-zorro-antd/carousel';

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
  @ViewChild(NzCarouselComponent, {static: false})

  myCarousel!: NzCarouselComponent;
  fileToUpload: any;
  fileListName: any[] = [];
  imageInput: any[] = [];
  fileList: any[] = [];
  listOfSite: any[] = [];
  hotelId: any;
  action: any;
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
      this.hotelId = params['id'];
      this.action = params['action'];
      if (this.hotelId) {
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
        this.getDetailHotel(this.hotelId);
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
    acreage: new FormControl('', {
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

  getDetailHotel(id: any) {
    this.hotelService.hotelDetail(id).subscribe(res => {
      if (res.code == 200) {
        const data = res.data;
        this.formGroup.setValue({
          name: data.name,
          acreage: data.acreage,
          site: data.siteId,
          phone: data.phone,
          totalRoom: data.totalRoom,
          email: data.email,
          description: data.description,
          address: data.address,
          // uploadFile: data.uploadFile,
        })
        this.fileList = data.images;
        this.fileList.forEach(element => {
          this.imageInput.push(element.path);
          this.fileListName.push(element.name);
        });
        console.log(this.fileList);
      }
    })
  }

  handleAddHotel = async() => {
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
    formData.append("acreage", formValue.acreage);
    formData.append("siteId", formValue.site);
    // formData.append("images", formValue.uploadFile);
    for (let index = 0; index < this.fileList.length; index++) {
      formData.append("images", this.fileList[index]);
    }

    // this.hotelService.addHotel(formData).subscribe(res => {
    //   console.log(res.body);
    //   if (res.body?.code == 200) {
    //     this.toast.success('Thành công', 'Thông báo');
    //     this.router.navigate(['/pages/hotel-management']);
    //   }
    //   if (res.body?.code == 400) {
    //     this.toast.success('Lỗi', 'Thông báo');
    //   }
    //   if (res.body?.code == 404) {
    //     this.toast.success('Lỗi', 'Thông báo');
    //   }
    // })

    try {
      const res = await this.hotelService.addHotel(formData);
      if (res.status == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/hotel-management']);
      }
      if (res.status == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.status == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onCancel() {
    this.router.navigate(['/pages/hotel-management']);
  }

  onFileSelect(event: any) {
    this.fileList = event.target.files;
    this.fileListName = [];
    this.imageInput = [];
    for (let index = 0; index < this.fileList.length; index++) {
      var reader = new FileReader();
      reader.readAsDataURL(this.fileList[index]);

      reader.onload = (e: any) => {
        this.imageInput.push(e.target.result);
      };

      this.fileListName.push(this.fileList[index].name);
    }
  }

  goToImage(slideNumber: any) {
    this.myCarousel.goTo(slideNumber);
  }

  pre() {
    // this.myCarousel.goTo(Number(0));
    this.myCarousel.pre();
  }

  next() {
    this.myCarousel.next();
  }

  removeImage(index: number) {
    this.imageInput.splice(index, 1);
    this.fileList.splice(index, 1);

    // if (!this.fileList.length) {
    //   this.msgErrImageNull = false
    // }
  }

}
