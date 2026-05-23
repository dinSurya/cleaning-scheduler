import { Plus } from 'lucide-react';

interface FormData {
  name: string;
  address: string;
  phone: string;
  date: string;
  time: string;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleAddAppointment: (e: React.FormEvent) => void;
}

export default function AppointmentForm({
  formData,
  setFormData,
  handleAddAppointment,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5" />
        New Appointment
      </h3>

      <form onSubmit={handleAddAppointment} className="space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          value={formData.name}
          onChange={e =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={e =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={e =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="date"
          value={formData.date}
          onChange={e =>
            setFormData({ ...formData, date: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="time"
          value={formData.time}
          onChange={e =>
            setFormData({ ...formData, time: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
}