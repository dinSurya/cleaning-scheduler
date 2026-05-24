import { Trash2 } from 'lucide-react';

interface Appointment {
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
  duration: number | null;
  frequency_weeks: number;

  status: 'scheduled' | 'in_progress' | 'completed' | 'canceled';

  notes?: string;
}

interface Props {
  appointments: Appointment[];
  deleteAppointment: (id: string) => void;
}

export default function AppointmentList({
  appointments,
  deleteAppointment,
}: Props) {
  return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">
          All Appointments ({appointments.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className="p-4 hover:bg-gray-50 transition flex justify-between"
          >
            <div>
              <h4 className="font-semibold">{apt.customer_name}</h4>
              <p className="text-sm text-gray-600">{apt.address}</p>
              <p className="text-sm text-gray-600">{apt.phone}</p>
              <p className="text-sm text-gray-600">{apt.app_date}, {apt.app_time}</p>
              <p className="text-sm text-gray-600">Requests: {apt.notes}</p>
            </div>

            <button
              onClick={() => deleteAppointment(apt.id)}
              className="text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}