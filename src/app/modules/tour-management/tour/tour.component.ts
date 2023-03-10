import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import constants from 'src/app/core/constants/constants';
import { TourService } from 'src/app/core/service/tour-management/tour.service';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  numberRoom: any;
  size: NzButtonSize = 'large';
  breadcrumb: any = [];
  listOfData: any = [];
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
  listOfSite: any = [];

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
  
  listOfStatus: any = [
    {
      id: 1,
      name: "Còn chỗ",
    },
    {
      id: 2,
      name: "Hết chỗ",
    },
  ];
  pageSize: any = 10;
  pageIndex: any = 0;
  sort: any = "id,asc";
  formGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    typeOfTour: new FormControl(''),
    leavingFrom: new FormControl(''),
    lengthOfStay: new FormControl(''),
    suitable: new FormControl(''),
  });
  constructor(
    private router: Router,
    private tourService: TourService,
  ) { }

  ngOnInit(): void {
    this.breadcrumb = [
      {
        name: "Quản lý tour",
        // route: "/pages/room-booking"
      },
      {
        name: "Danh sách tour",
        // route: "/pages/room-booking"
      }
    ]

    this.getAllTour();

    this.tourService.getAllSite().subscribe(res => {
      if (res.code === 200) {
        this.listOfSite = res.data;
      }
    })
  }

  sortChange(e: any) {
    
  }

  addTour() {
    this.router.navigate(['pages/tour-management/save-tour']);
  }

  updateHotel(data: any, check: any) {
    const params = {
      id: data.id,
      action: check == 1 ? "PROCESS" : "DETAIL",
    }
    this.router.navigate(['pages/tour-management/save-tour'], {queryParams: params});
  }

  search() {
    this.getAllTour();
  }

  getAllTour() {
    // const data = {
    //   numRoom: this.numberRoom,
    //   name: this.numberRoom,
    //   phone: this.numberRoom,
    //   pageIndex: this.numberRoom,
    //   pageSize: this.numberRoom,
    // }
    const formValue = this.formGroup.value;
    
    this.tourService.getListTour(this.pageSize, this.pageIndex, this.sort, formValue.name, formValue.totalRoom, formValue.phone).subscribe(res => {
      if (res.code == 200) {
        this.listOfData = res.data.content;
        console.log(res.data.content);
      }
    })
  }
}
