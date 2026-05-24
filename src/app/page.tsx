'use client';

import { useEffect, useState } from 'react';

import Calendar from '@/components/Calendar';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';
import { AppointmentFormData } from "@/types/appointment";

import { supabase } from "@/lib/supabase";

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

export default function Home() {
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [formData, setFormData] = useState<AppointmentFormData>({
  name: '',
  phone: '',
  email: '',
  address: '',

  date: '',
  time: '',

  num_bed: 1,
  num_bath: 1,
  num_floors: 1,

  frequency_weeks: 1,

  notes: '',
});

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleAddAppointment = async (e: React.FormEvent) => {
  e.preventDefault();

  const duration =
  1 +
  formData.num_bed * 1 +
  formData.num_bath * 0.5 +
  formData.num_floors * 0.75; /* formula to calculate duration */

  const newAppointment = {
  customer_name: formData.name,
  phone: formData.phone,
  email: formData.email,
  address: formData.address,

  app_date: formData.date,
  app_time: formData.time,

  num_bed: formData.num_bed,
  num_bath: formData.num_bath,
  num_floors: formData.num_floors,
  duration: duration,

  frequency_weeks: formData.frequency_weeks,

  notes: formData.notes,

  status: 'scheduled',
};

  const { data, error } = await supabase
    .from("appointments")
    .insert(newAppointment)
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  setAppointments(prev => [...prev, data as Appointment]);
};

  const deleteAppointment = async (id: string) => {
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setAppointments(prev => prev.filter(apt => apt.id !== id));
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

  useEffect(() => {
  async function fetchAppointments() {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setAppointments(data || []);
  }

  fetchAppointments();
}, []);

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