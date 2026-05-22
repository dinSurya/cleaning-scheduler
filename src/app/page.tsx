'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Plus } from 'lucide-react';

interface Appointment {
  id: number;
  name: string;
  address: string;
  phone: string;
  date: string;
  time: string;
}

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      name: 'John Smith',
      address: '123 Main St, Apt 4B',
      phone: '(555) 123-4567',
      date: '2026-05-24',
      time: '09:00',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      address: '456 Oak Ave',
      phone: '(555) 987-6543',
      date: '2026-05-24',
      time: '11:00',
    },
    {
      id: 3,
      name: 'Mike Davis',
      address: '789 Pine Rd',
      phone: '(555) 456-7890',
      date: '2026-05-25',
      time: '14:00',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    date: '',
    time: '',
  });

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 22)); // May 2026

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  // Get appointments for a specific date
  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(apt => apt.date === dateStr);
  };

  // Handle form submission
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.address && formData.phone && formData.date && formData.time) {
      setAppointments([
        ...appointments,
        {
          id: Math.max(...appointments.map(a => a.id), 0) + 1,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
        },
      ]);
      setFormData({ name: '', address: '', phone: '', date: '', time: '' });
    }
  };

  // Delete appointment
  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  // Previous month
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // Next month
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cleaning Appointments</h1>
          <p className="text-gray-600">Manage your cleaning company's schedule</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900 w-48 text-center">
                  {monthName}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2 text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty days before month starts */}
                {emptyDays.map(i => (
                  <div key={`empty-${i}`} className="h-32 bg-gray-50 rounded-lg"></div>
                ))}

                {/* Days of month */}
                {days.map(day => {
                  const dayAppointments = getAppointmentsForDate(day);
                  const isToday =
                    day === 22 &&
                    currentMonth.getMonth() === 4 &&
                    currentMonth.getFullYear() === 2026;

                  return (
                    <div
                      key={day}
                      className={`h-32 p-2 rounded-lg border-2 overflow-y-auto ${
                        isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div
                        className={`text-sm font-semibold mb-2 ${
                          isToday ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.map(apt => (
                          <div key={apt.id} className="text-xs bg-blue-100 text-blue-800 p-1 rounded truncate">
                            {apt.time} - {apt.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Add Appointment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Appointment
              </h3>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St, Apt 4B"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Add Appointment
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              All Appointments ({appointments.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {appointments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No appointments scheduled yet
              </div>
            ) : (
              appointments
                .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
                .map(apt => (
                  <div key={apt.id} className="p-4 hover:bg-gray-50 transition flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{apt.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">📍 {apt.address}</p>
                      <p className="text-sm text-gray-600">📞 {apt.phone}</p>
                      <p className="text-sm text-blue-600 font-medium mt-1">
                        {new Date(`${apt.date}T${apt.time}`).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteAppointment(apt.id)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
