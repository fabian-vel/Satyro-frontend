import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../service/httpService/http.service";
import {AlertService} from "../../service/sweetalert2/alert.service";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatExpansionPanel} from "@angular/material/expansion";
import {EventDataManager} from "../../data-manager/eventDataManager";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'description', 'startDate', 'startTime',
    'endTime', 'endDate', 'location', 'category', 'guestCapacity', 'action'];
  events: any;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  category: any;
  minStartDate = new Date();
  minEndDate = new Date();

  constructor(private httpService: HttpService,
              private alertService: AlertService,
              private eventDataManager: EventDataManager) {
    this.dataSource = new MatTableDataSource();
  }

  @ViewChild(MatExpansionPanel) expansionPanel!: MatExpansionPanel;

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllEvent();
  }

  ngOnInit() {
    this.getCategory();
    this.getAllEvent();
  }

  form = new FormGroup ({
    id: new FormControl({value: '', disabled: false}),
    name: new FormControl({value: '', disabled: false}, [ Validators.required]),
    description: new FormControl({value: '', disabled: false}, [ Validators.required]),
    startDate: new FormControl({value: '', disabled: false}, [ Validators.required]),
    startTime: new FormControl({value: '', disabled: false}),
    endDate: new FormControl({value: '', disabled: false}, [ Validators.required]),
    endTime: new FormControl({value: '', disabled: false}),
    location: new FormControl({value: '', disabled: false}, [ Validators.required]),
    category: new FormControl({value: '', disabled: false}, [ Validators.required]),
    guestCapacity: new FormControl({value: '', disabled: false}, [ Validators.required])
  });

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

  getCategory() {
    const body = {page: this.pageIndex, size: this.pageSize};
    this.httpService.get<any>('category/getAll').subscribe({
      next: (res: any) => {
        this.category = res.data;
      },
      error: (error) => {
        this.alertService.error('Error al listar categorías: ' + error.message);
      }
    });
  }

  selectEvent(element: any) {
    this.eventDataManager.formatEventObjectForm(this.form, element);
    this.expansionPanel.open();
  }

  saveEvent(form: FormGroup) {
    const body = this.eventDataManager.formatEventObject(form.value);
    this.httpService.post<any>('event/save', body).subscribe({
      next: (res: any) => {
        this.getAllEvent();
        this.alertService.success('Evento guardado');
      },
      error: (error) => {
        this.alertService.error('Error al guardar evento: ' + error.message);
      }
    })
  }

  updateEvent(form: FormGroup) {
    const body = this.eventDataManager.formatEventObject(form.value);
    this.httpService.post<any>('event/update', body).subscribe({
      next: (res: any) => {
        this.getAllEvent();
        this.alertService.success('Evento actualizado');
      },
      error: (error) => {
        this.alertService.error('Error al actualizar evento: ' + error.message);
      }
    })
  }

  validateSaveOrUpdate() {
    console.log('formulario ',this.form.value);
    if (this.form.valid) {
      this.saveOrUpdateEvent(this.form);
    } else {
      const invalidControls = this.findInvalidControls();
      console.log('Campos inválidos: ', invalidControls);
      this.alertService.warning('Hay campos obligatorios sin llenar');
    }
  }

  findInvalidControls(): string[] {
    const invalidControls: string[] = [];
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.invalid) {
        invalidControls.push(key); // Agrega el nombre del control inválido
        console.log(`Campo "${key}" es inválido:`, control.errors);
      }
    });
    return invalidControls;
  }

  saveOrUpdateEvent(form: FormGroup) {
    if(!form.get('id')?.value) {
      this.saveEvent(form);
    } else {
      this.updateEvent(form);
    }
    this.formReset();
  }

  formReset() {
    this.form.reset();
    this.getMinimumEndDate();
  }

  validateDates() {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        this.alertService.warning(
          'La fecha inicio no puede ser mayor que la fecha fin.',
          'Fechas inválidas'
        );
        this.form.get('startDate')?.reset();
        this.form.get('endDate')?.reset();
        this.getMinimumEndDate();
      }
    }
  }

  getMinimumEndDate() {
    const startDate = this.form.get('startDate')?.value;
    if(startDate) {
      this.minEndDate = new Date(startDate);
    } else {
      this.minEndDate = new Date();
    }
  }

}
