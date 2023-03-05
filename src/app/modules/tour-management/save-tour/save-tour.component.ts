import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';
import { ToastrService } from 'ngx-toastr';
import { Editor, Toolbar } from 'ngx-editor';
import { TourService } from 'src/app/core/service/tour-management/tour.service';

@Component({
  selector: 'app-save-tour',
  templateUrl: './save-tour.component.html',
  styleUrls: ['./save-tour.component.scss']
})
export class SaveTourComponent implements OnInit {

  fileToUpload: any;
  fileListName: any[] = [];
  selectedFile: any;
  listOfSite: any[] = [];
  htmlContent = '';
  descriptionEditor: any;
  inclusionEditor: any;
  termsConditionsEditor: any;
  html = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  listOfTypeOfTour: any = [
    {
      id: 1,
      name: "Gói nghỉ dưỡng",
    },
    {
      id: 2,
      name: "VinWonders",
    },
    {
      id: 3,
      name: "Vận chuyển",
    },
    {
      id: 4,
      name: "Vinpearl Golf",
    },
    {
      id: 5,
      name: "Ẩm thực",
    },
    {
      id: 6,
      name: "Tour",
    },
    {
      id: 7,
      name: "Vé tham quan",
    },
    {
      id: 7,
      name: "Spa",
    },
  ];
  listOfLengthOfStay: any = [
    {
      id: 1,
      name: "1 ngày",
    },
    {
      id: 2,
      name: "2 ngày 1 đêm",
    },
    {
      id: 3,
      name: "3 ngày 2 đêm",
    },
    {
      id: 4,
      name: "4 ngày 3 đêm",
    },
    {
      id: 5,
      name: "5 ngày 4 đêm",
    },
    {
      id: 6,
      name: "6 ngày 4 đêm",
    },
    {
      id: 7,
      name: "6 ngày 5 đêm",
    },
    {
      id: 7,
      name: "22 ngày 21 đêm",
    },
  ];

  listOfSuitable: any = [
    {
      id: 1,
      name: "Tất cả",
    },
    {
      id: 2,
      name: "Cặp đôi",
    },
    {
      id: 3,
      name: "Gia đình",
    },
    {
      id: 4,
      name: "Nhóm bạn",
    },
    {
      id: 5,
      name: "Doanh nhân",
    },
  ];
  
  tourId: any;
  breadcrumb: any = [];
  loading = false;
  avatarUrl?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private tourService: TourService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.descriptionEditor = new Editor();
    this.inclusionEditor = new Editor();
    this.termsConditionsEditor = new Editor();
    this.route.queryParams.subscribe(params => {
      this.tourId = params['id'];
      if (this.tourId) {
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
        this.getDetailTour(this.tourId);
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

    this.tourService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
    })
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.descriptionEditor.destroy();
    this.inclusionEditor.destroy();
    this.termsConditionsEditor.destroy();
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    numberOfPeople: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    suitable: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    typeOfTour: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    leavingFrom: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    leavingTo: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    lengthOfStay: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    path: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
    }),
    price: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    expirationDate: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    inclusion: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    termsConditions: new FormControl('', {
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

  getDetailTour(id: any) {
    this.tourService.TourDetail(id).subscribe(res => {
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

  handleAddTour() {
    const formValue = this.formGroup.value;
    console.log(formValue);
    const data = {
      name: formValue.name,
      numberOfPeople: formValue.numberOfPeople,
      suitableId: formValue.suitable,
      // typeOfTourId: formValue.typeOfTour,
      leavingFromId: formValue.leavingFrom,
      leavingToId: formValue.leavingTo,
      lengthOfStayId: formValue.lengthOfStay,
      price: formValue.price,
      expirationDateMls: formValue.expirationDate,
      description: formValue.description,
      inclusion: formValue.inclusion,
      termsConditions: formValue.termsConditions,
      path: formValue.path,
    }
    this.tourService.addTour(data).subscribe(res => {
      console.log(res);
      if (res.code === 200) {
        console.log(res);
      }
    })
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }
    
    // const formData = new FormData();
    // formData.append("name", formValue.name);
    // formData.append("email", formValue.email);
    // formData.append("description", formValue.description);
    // formData.append("address", formValue.address);
    // formData.append("phone", formValue.phone);
    // formData.append("totalRoom", formValue.totalRoom);
    // formData.append("area", formValue.area);
    // formData.append("siteId", formValue.site);
    // // formData.append("images", formValue.uploadFile);
    // for (let index = 0; index < this.selectedFile.length; index++) {
    //   formData.append("images", this.selectedFile[index]);
    // }

    // this.tourService.addHotel(formData).subscribe(res => {
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
