import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';
import { RoomService } from 'src/app/core/service/room-management/room.service';
import { ToastrService } from 'ngx-toastr';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'app-save-type-of-room',
  templateUrl: './save-type-of-room.component.html',
  styleUrls: ['./save-type-of-room.component.scss']
})
export class SaveTypeOfRoomComponent implements OnInit {

  myCarousel!: NzCarouselComponent;
  typeOfRoomId: any;
  breadcrumb: any = [];
  fileListName: any[] = [];
  imageInput: any[] = [];
  fileList: any[] = [];
  listOfService: any[] = [];
  listOfHotel: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.typeOfRoomId = params['id'];
      if (this.typeOfRoomId) {
        this.breadcrumb = [
          {
            name: "Quản lý phòng",
            // route: "/pages/room-booking"
          },
          {
            name: "Cập nhật loại phòng",
            // route: "/pages/room-booking"
          }
        ]

        this.getDetailRoomType(this.typeOfRoomId);
      } else {
        this.breadcrumb = [
          {
            name: "Quản lý phòng",
            // route: "/pages/room-booking"
          },
          {
            name: "Thêm mới loại phòng",
            // route: "/pages/room-booking"
          }
        ]
      }
    });

    this.getListHotel();
  }

  getListHotel() {
    this.roomService.getListHotel().subscribe(res => {
      if (res.code === 200) {
        this.listOfHotel = res.data;
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
    numberParent: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    numberChildren: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    numberOfRooms: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    hotel: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  getDetailRoomType(id: any) {
    this.roomService.roomTypeDetail(id).subscribe(res => {

      if (res.code == 200) {
        const data = res.data;
        this.formGroup.setValue({
          name: data.name,
          acreage: data.acreage,
          numberParent: data.numberParent,
          numberChildren: data.numberChildren,
          numberOfRooms: data.numberOfRooms,
          description: data.description,
          hotel: data.hotelId,
          // uploadFile: data.uploadFile,
        })
        this.fileList = data.images;
        this.fileList.forEach(element => {
          this.imageInput.push(element.path);
          this.fileListName.push(element.name);
        });
      }
    })
  }

  handleAddTypeOfRoom() {
    const formValue = this.formGroup.value;
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }
    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("acreage", formValue.acreage);
    formData.append("numberParent", formValue.numberParent);
    formData.append("numberChildren", formValue.numberChildren);
    formData.append("numberOfRooms", formValue.numberOfRooms);
    formData.append("acreage", formValue.acreage);
    formData.append("description", formValue.site);
    formData.append("hotelId", formValue.hotel);
    for (let index = 0; index < this.fileList.length; index++) {
      formData.append("images", this.fileList[index]);
    }

    this.roomService.addRoomType(formData).subscribe(res => {
      console.log(res.body);
      if (res.body?.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/room-management/type-of-room']);
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
    this.router.navigate(['/pages/room-management/type-of-room']);
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
