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

export interface Appointment {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  address: string;

  num_bed: number;
  num_bath: number;
  num_floors: number;

  app_date: string;
  app_time: string;
  duration: number;
  frequency_weeks: number;

  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled';
  archived: boolean;

  notes?: string;
}

export function getAppointmentStatus(apt: Appointment) {
  if (apt.status === "canceled") return "canceled";

  const start = new Date(`${apt.app_date}T${apt.app_time}`);
  const end = new Date(start.getTime() + apt.duration * 60 * 60 * 1000);
  const now = new Date();

  if (now < start) return "scheduled";
  if (now >= start && now <= end) return "in_progress";
  return "completed";
}