export interface IEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  location: string;
  category: any;
  guestCapacity: string;
}
