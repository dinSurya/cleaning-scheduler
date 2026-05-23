import { Trash2 } from 'lucide-react';

interface Appointment {
  id: number;
  name: string;
  address: string;
  phone: string;
  date: string;
  time: string;
}

interface Props {
  appointments: Appointment[];
  deleteAppointment: (id: number) => void;
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

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className="p-4 hover:bg-gray-50 transition flex justify-between"
          >
            <div>
              <h4 className="font-semibold">{apt.name}</h4>
              <p className="text-sm text-gray-600">{apt.address}</p>
              <p className="text-sm text-gray-600">{apt.phone}</p>
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