import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../service/httpService/http.service";
import {AlertService} from "../../service/sweetalert2/alert.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  events: any;

  constructor(private httpService: HttpService,
              private alertService: AlertService,) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {}

  getAllEvent() {
    const body = null;
    this.httpService.post<any>('getAll', body).subscribe({
      next: (res: any) => {
        this.events = res.data;
      },
      error: (error) => {
        this.alertService.error('Error al listar eventos: ' + error.message);
      }
    });
  }
}
