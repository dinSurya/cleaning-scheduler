'use client';

import { useState } from 'react';

import Calendar from '@/components/Calendar';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';

interface Appointment {
  id: number;
  name: string;
  address: string;
  phone: string;
  date: string;
  time: string;
}

export default function Home() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    date: '',
    time: '',
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        ...formData,
      },
    ]);
  };

  const deleteAppointment = (id: number) => {
    setAppointments(
      appointments.filter(apt => apt.id !== id)
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1
      )
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Cleaning Schedule
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <Calendar
              currentMonth={currentMonth}
              appointments={appointments}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
            />
          </div>

          <div>
            <AppointmentForm
              formData={formData}
              setFormData={setFormData}
              handleAddAppointment={handleAddAppointment}
            />
          </div>

        </div>

        <AppointmentList
          appointments={appointments}
          deleteAppointment={deleteAppointment}
        />

      </div>
    </div>
  );
}