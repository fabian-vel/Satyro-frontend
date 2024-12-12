import {Injectable} from "@angular/core";
import {IEvent} from "../interface/i-event";
import {FormGroup} from "@angular/forms";
import {format, parse} from "date-fns";


@Injectable({
  providedIn: 'root'
})
export class EventDataManager {
  formatEventObject(formValues: any): IEvent {
    console.log(formValues);
    return {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      startDate: formValues.startDate,
      startTime: this.formatTime(formValues.startTime),
      endDate: formValues.endDate,
      endTime: this.formatTime(formValues.endTime),
      location: formValues.location,
      category: {id: formValues.category},
      guestCapacity:formValues.guestCapacity
    };
  }

  private formatTime(time: string): string {
    const parsedTime = parse(time, 'hh:mm:ss a', new Date());
    return format(parsedTime, 'HH:mm:ss');
  }

  formatEventObjectForm(form: FormGroup, element: any) {
    if (element) {
      form.patchValue({
        id: element.id,
        name: element.name,
        description: element.description,
        startDate: element.startDate,
        startTime: element.startTime,
        endDate: element.endDate,
        endTime: element.endTime,
        location: element.location,
        category: element.category.id,
        guestCapacity: element.guestCapacity
      });
    }
  }
}
