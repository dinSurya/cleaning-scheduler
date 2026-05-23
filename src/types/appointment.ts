export interface AppointmentFormData {
  name: string;
  phone: string;
  email?: string;
  address: string;

  date: string;
  time: string;

  num_bed: number;
  num_bath: number;
  num_floors: number;

  frequency_weeks: number;

  notes: string;
}