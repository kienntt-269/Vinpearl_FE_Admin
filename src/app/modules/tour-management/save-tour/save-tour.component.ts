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
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-save-tour',
  templateUrl: './save-tour.component.html',
  styleUrls: ['./save-tour.component.scss']
})
export class SaveTourComponent implements OnInit {
  @ViewChild(NzCarouselComponent, { static: false })

  myCarousel!: NzCarouselComponent;
  fileToUpload: any;
  fileListName: any[] = [];
  imageInput: any[] = [];
  fileList: any[] = [];
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
      id: 8,
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
      name: "Cặp đôi",
    },
    {
      id: 2,
      name: "Gia đình",
    },
    {
      id: 3,
      name: "Nhóm bạn",
    },
    {
      id: 4,
      name: "Doanh nhân",
    },
  ];

  tourId: any;
  action: any;
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
      this.action = params['action'];
      if (this.action == "DETAIL") {
        //disable all input
        Object.keys(this.formGroup.controls).forEach((key) => {
          this.formGroup.get(key)?.disable();
        });
      }
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
        // Validators.required,
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
    // path: new FormControl('', {
    //   validators: [
    //     Validators.required,
    //     Validators.maxLength(255),
    //   ],
    // }),
    priceAdult: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    priceChildren: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    expirationDate: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    startDate: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    endDate: new FormControl('', {
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
        const data = res.data[0]?.tour;
        this.formGroup.setValue({
          name: data.name,
          numberOfPeople: data.numberOfPeople,
          suitable: data.suitableId,
          leavingFrom: data.leavingFromId,
          leavingTo: data.leavingToId,
          lengthOfStay: data.lengthStayId,
          priceAdult: data.priceAdult,
          priceChildren: data.priceChildren,
          typeOfTour: data.typeOfTourId,
          description: data.description,
          inclusion: data.inclusion,
          termsConditions: data.termsConditions,
          expirationDate: data.expirationDate,
          startDate: data.startDate,
          endDate: data.endDate,
        })
        this.fileList = data.images;
        this.fileList.forEach(element => {
          this.imageInput.push(element.path);
          this.fileListName.push(element.name);
        });
      }
    })
  }

  handleAddTour = async () =>  {
    const formValue = this.formGroup.value;
    if (this.formGroup.invalid) {
      for (const control of Object.keys(this.formGroup.controls)) {
        this.formGroup.controls[control].markAsTouched();
      }
      return;
    }

    const suitableId = formValue.suitable ? formValue.suitable : 0;

    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("numberOfPeople", formValue.numberOfPeople);
    formData.append("suitableId", suitableId);
    formData.append("leavingFromId", formValue.leavingFrom);
    formData.append("leavingToId", formValue.leavingTo);
    formData.append("lengthStayId", formValue.lengthOfStay);
    formData.append("priceAdult", formValue.priceAdult);
    formData.append("priceChildren", formValue.priceChildren);
    formData.append("typeOfTourId", formValue.typeOfTour);
    formData.append("description", formValue.description);
    formData.append("inclusion", formValue.inclusion);
    formData.append("termsConditions", formValue.termsConditions);
    // if (typeof(formValue.expirationDate) === "object") {
      formValue.expirationDate = new Date(formValue.expirationDate).getTime();
    // }
    formData.append("expirationDateMls", formValue.expirationDate);
    // if (typeof(formValue.startDate) === "object") {
      formValue.startDate = new Date(formValue.startDate).getTime();
    // }
    formData.append("startDateMls", formValue.startDate);
    // if (typeof(formValue.endDate) === "object") {
      formValue.endDate = new Date(formValue.endDate).getTime();
    // }
    formData.append("endDateMls", formValue.endDate);
    // formData.append("images", formValue.uploadFile);
    for (let index = 0; index < this.fileList.length; index++) {
      formData.append("images", this.fileList[index]);
    }

    if (this.tourId) {
      formData.append("id", this.tourId);
    }

    try {
      const res = await this.tourService.addTour(formData);
      if (res.status == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/tour-management/tour']);
      }
      if (res.status == 400) {
        this.toast.error('Lỗi', 'Thông báo');
      }
      if (res.status == 404) {
        this.toast.error('Lỗi', 'Thông báo');
      }
    } catch (error) {
      console.log(error);
    }

    // this.tourService.addTour(formData).subscribe(res => {
    //   if (res.body?.code == 200) {
    //     this.toast.success('Thành công', 'Thông báo');
    //     this.router.navigate(['/pages/tour']);
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
    this.router.navigate(['/pages/tour-management/tour']);
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

}
