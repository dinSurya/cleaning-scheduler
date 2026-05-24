import { Plus } from 'lucide-react';

import { AppointmentFormData } from "@/types/appointment";

interface Props {
  formData: AppointmentFormData;
  setFormData: React.Dispatch<React.SetStateAction<AppointmentFormData>>;
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

        <label className="block text-sm font-medium mb-1">
          Customer Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={e =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="1234567890"
          value={formData.phone}
          onChange={e =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Email: xyz@email.com"
          value={formData.email}
          onChange={e =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Home Address
        </label>
        <input
          type="text"
          placeholder="123 Main St."
          value={formData.address}
          onChange={e =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Number of Floors
        </label>
        <input
          type="number"
          min={1}
          value={formData.num_floors}
          onChange={e =>
            setFormData({ ...formData, num_floors: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Number of Bedrooms
        </label>
        <input
          type="number"
          min={1}
          value={formData.num_bed}
          onChange={e =>
            setFormData({ ...formData, num_bed: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Number of Bathrooms
        </label>
        <input
          type="number"
          min={1}
          value={formData.num_bath}
          onChange={e =>
            setFormData({ ...formData, num_bath: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Date of Service
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={e =>
            setFormData({ ...formData, date: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Time of Service
        </label>
        <input
          type="time"
          value={formData.time}
          onChange={e =>
            setFormData({ ...formData, time: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Frequency of Cleaning (number of weeks)
        </label>
        <input
          type="number"
          min={0}
          value={formData.frequency_weeks}
          onChange={e =>
            setFormData({ ...formData, frequency_weeks: Number(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />

        <label className="block text-sm font-medium mb-1">
          Special Customer Requests
        </label>
        <input
          type="text"
          placeholder="Notes from Customer (special requests)"
          value={formData.notes}
          onChange={e =>
            setFormData({ ...formData, notes: e.target.value })
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