import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatMenuTrigger} from "@angular/material/menu";
import {MatFormFieldAppearance} from "@angular/material/form-field";

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true,
    },
  ],
})
export class TimepickerComponent implements OnInit {
  form: FormGroup;
  timeControl = new FormControl('');
  hour: number = 0;
  minute: number = 0;
  period: string = '';

  @Input() appearance: MatFormFieldAppearance = 'fill'; // Default appearance
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Output() timeSelected = new EventEmitter<string>();
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.form = new FormGroup({
      hour: new FormControl('00'),
      minute: new FormControl('00'),
      period: new FormControl('AM')
    });
  }

  ngOnInit(): void {}

  // Methods required by ControlValueAccessor
  writeValue(value: string): void {
    if (value) {
      const [time, period] = value.split(' ');
      const [hour, minute] = time.split(':');
      this.form.setValue({
        hour: hour || '00',
        minute: minute || '00',
        period: period || 'AM',
      });

      const timeString = `${hour || '00'}:${minute || '00'} ${period || 'AM'}`;
      this.timeControl.setValue(timeString);
    }else {
      // Limpiar el formulario interno si el valor es null o vacío
      this.form.setValue({
        hour: '00',
        minute: '00',
        period: 'AM',
      });
      this.timeControl.setValue('');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  setTime() {
    if (this.form.valid) {
      const { hour, minute, period } = this.form.value;
      const timeString = `${hour}:${minute} ${period}`;
      this.timeControl.setValue(timeString);
      this.onChange(timeString);
      this.cerrarMenu();
    }
  }

  cerrarMenu() {
    this.menuTrigger.closeMenu();
  }

  setHour(action: string) {
    if (action === 'sumar') {
      this.hour = this.hour === 12 ? 1 : this.hour + 1; // Cicla de 12 a 1
    } else {
      this.hour = this.hour === 1 ? 12 : this.hour - 1; // Cicla de 1 a 12
    }
    this.form.get("hour")?.setValue(this.addZero(this.hour));
  }

  setMinute(action: string) {
    if (action === 'sumar') {
      this.minute = this.minute === 59 ? 0 : this.minute + 1; // Cicla de 59 a 0
    } else {
      this.minute = this.minute === 0 ? 59 : this.minute - 1; // Cicla de 0 a 59
    }
    this.form.get("minute")?.setValue(this.addZero(this.minute));
  }

  setPeriod() {
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.form.get("period")?.setValue(this.period);
  }

  addZero(digite: number): string {
    return digite < 10 ? `0${digite}` : `${digite}`;
  }

  inputReset() {
    this.timeControl.reset();
    this.form.setValue({
      hour: '00',
      minute: '00',
      period: 'AM'
    });
    this.timeControl.setValue('');
    this.onChange('');
  }
}
