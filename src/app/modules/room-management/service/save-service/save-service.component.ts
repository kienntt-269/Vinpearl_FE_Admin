import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/core/service/room-management/room.service';
import { REGEX_PATTERN } from 'src/app/shared/constains/pattern.constant';


@Component({
  selector: 'app-save-service',
  templateUrl: './save-service.component.html',
  styleUrls: ['./save-service.component.scss']
})
export class SaveServiceComponent implements OnInit {

  breadcrumb: any = [];
  listOfName: any[] = [];
  listOfDescription: any[] = [];
  listOfContent: any[] = [];
  listOfTypeOfRoom: any[] = [];
  isVisibleName = false;
  isVisibleDescription = false;
  isVisibleContent = false;
  constructor(
    private roomService: RoomService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
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

    this.getListService();    
    this.getListDescription();    
    this.getListContent();
    this.getListTypeOfRoom();
  }

  getListService() {
    this.roomService.getListService().subscribe(res => {
      if (res.code === 200) {
        this.listOfName = res.data;
      }
    })
  }

  getListDescription() {
    this.roomService.getListDescription().subscribe(res => {
      if (res.code === 200) {
        this.listOfDescription = res.data;
      }
    })
  }

  getListContent() {
    this.roomService.getListContent().subscribe(res => {
      if (res.code === 200) {
        this.listOfContent = res.data;
      }
    })
  }

  getListTypeOfRoom() {
    this.roomService.getListTypeOfRoom().subscribe(res => {
      if (res.code === 200) {
        this.listOfTypeOfRoom = res.data;
      }
    })
  }

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    description: new FormControl([], {
      validators: [
        Validators.required,
      ],
    }),
    content: new FormControl([], {
      validators: [
        Validators.required,
      ],
    }),
    typeOfRoom: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  formAddService: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    price: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  formAddDescription: FormGroup = new FormGroup({
    description: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  formAddContent: FormGroup = new FormGroup({
    content: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  });

  saveService() {
    const formValue = this.formGroup.value;
    const body = {
      id: formValue.name,
      descriptionIds: formValue.description,
      contentIds: formValue.content,
      typeofRoomId: formValue.typeOfRoom,
    }

    this.roomService.saveService(body).subscribe(res => {
      console.log(res.body);
      if (res.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.router.navigate(['/pages/room-management/service']);
      }
      if (res.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.code == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }

  addName(): void {
    this.isVisibleName = true;
  }

  callApiAddName(): void {
    const data = {
      name: this.formAddService.value.name,
      price: this.formAddService.value.price,
    };
    if (this.formAddService.invalid) {
      for (const control of Object.keys(this.formAddService.controls)) {
        this.formAddService.controls[control].markAsTouched();
      }
      return;
    }
    this.roomService.addService(data).subscribe(res => {
      console.log(res.body);
      if (res.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.isVisibleName = false;
        this.getListService();
      }
      if (res.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.code == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }

  handleCancelName(): void {
    this.isVisibleName = false;
  }

  addDescription(): void {
    this.isVisibleDescription = true;
  }

  callApiAddDescription(): void {
    const data = {
      name: this.formAddDescription.value.description,
    };
    if (this.formAddDescription.invalid) {
      for (const control of Object.keys(this.formAddDescription.controls)) {
        this.formAddDescription.controls[control].markAsTouched();
      }
      return;
    }
    this.roomService.addDescription(data).subscribe(res => {
      console.log(res.body);
      if (res.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.isVisibleDescription = false;
        this.getListDescription();
      }
      if (res.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.code == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }

  handleCancelDescription(): void {
    this.isVisibleDescription = false;
  }

  addContent(): void {
    this.isVisibleContent = true;
  }

  callApiAddContent(): void {
    const data = {
      name: this.formAddContent.value.content,
    };
    if (this.formAddContent.invalid) {
      for (const control of Object.keys(this.formAddContent.controls)) {
        this.formAddContent.controls[control].markAsTouched();
      }
      return;
    }
    this.roomService.addContent(data).subscribe(res => {
      console.log(res.body);
      if (res.code == 200) {
        this.toast.success('Thành công', 'Thông báo');
        this.isVisibleContent = false;
        this.getListContent();
      }
      if (res.code == 400) {
        this.toast.success('Lỗi', 'Thông báo');
      }
      if (res.code == 404) {
        this.toast.success('Lỗi', 'Thông báo');
      }
    })
  }

  handleCancelContent(): void {
    this.isVisibleContent = false;
  }

  cancel() {
    this.router.navigate(['/pages/room-management/service']);
  }
}
