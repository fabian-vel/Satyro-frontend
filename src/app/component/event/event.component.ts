import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../service/httpService/http.service";
import {AlertService} from "../../service/sweetalert2/alert.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate','location','category','guestCapacity'];
  events: any;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private httpService: HttpService,
              private alertService: AlertService,) {
    this.dataSource = new MatTableDataSource();
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllEvent();
  }

  ngOnInit() {
    this.getAllEvent();
  }

  getAllEvent() {
    const body = {page: this.pageIndex, size: this.pageSize};
    this.httpService.post<any>('event/getAll', body).subscribe({
      next: (res: any) => {
        this.length = res.data.total;
        this.events = res.data.events;
        this.dataSource = new MatTableDataSource(this.events)
      },
      error: (error) => {
        this.alertService.error('Error al listar eventos: ' + error.message);
      }
    });
  }
}
