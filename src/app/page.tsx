'use client';

import { useEffect, useState } from 'react';

import Calendar from '@/components/Calendar';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';
import { AppointmentFormData } from "@/types/appointment";
import { Appointment } from "@/types/appointment";

import { supabase } from "@/lib/supabase";

export default function Home() {

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormData = {
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
  };

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
    setError(null);

    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.date ||
      !formData.time
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.num_bed < 0 || formData.num_bath < 0) {
      setError("Bedrooms and bathrooms must be at least 0.");
      return;
    }

    const duration =
      1 + formData.num_floors; /* formula to calculate duration */

    const newAppointment = {
      customer_name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      address: formData.address,

      app_date: formData.date,
      app_time: formData.time,

      num_bed: formData.num_bed,
      num_bath: formData.num_bath,
      num_floors: formData.num_floors,
      duration,

      frequency_weeks: formData.frequency_weeks,

      notes: formData.notes,

      status: 'scheduled',
      archived: false,
    };

    const newStart = new Date(
      `${formData.date}T${formData.time}`
    );

    const newEnd = new Date(
      newStart.getTime() + duration * 60 * 60 * 1000
    );

    const cutoff = new Date(`${formData.date}T15:00`);

    if (newStart > cutoff) {
      setError("Appointments cannot start after 3:00 PM.");
      return;
    }

    const sameDayAppointments = appointments.filter(
      apt => apt.app_date === formData.date
    );

    for (const apt of sameDayAppointments) {
      const existingStart = new Date(
        `${apt.app_date}T${apt.app_time}`
      );

      const existingEnd = new Date(
        existingStart.getTime() +
        apt.duration * 60 * 60 * 1000
      );

      const overlaps =
        newStart < existingEnd &&
        newEnd > existingStart;

      if (overlaps) {
        setError(
          `Conflicts with another appointment at ${apt.app_time}`
        );
        return;
      }
    }

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

    setIsModalOpen(false);            // closes modal

    setTimeout(() => {
      setFormData(initialFormData);   // clears form quietly
    }, 200);
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

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("archived", false)
      .order("app_date", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setAppointments(data || []);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'archived'>('active');

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "archived") {
      return apt.archived === true;
    }

    if (activeTab === "completed") {
      return apt.status === "completed" && !apt.archived;
    }

    return (
      !apt.archived &&
      (apt.status === "scheduled" || apt.status === "in_progress")
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Cleaning Schedule
        </h1>


        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-mauve-300 text-black px-4 py-2 rounded-lg hover:bg-slate-500"
        >
          + New Appointment
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white w-[95%] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-lg p-4 sm:p-6 relative">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Your form */}
              <AppointmentForm
                formData={formData}
                setFormData={setFormData}
                handleAddAppointment={handleAddAppointment}
              />
            </div>

          </div>
        )}

        <div className="flex gap-2 mb-4">
          {['active', 'completed', 'archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                          ${activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                        `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div>
            <AppointmentList
              appointments={filteredAppointments}
              deleteAppointment={deleteAppointment}
            />
          </div>

          <div className="lg:col-span-2">
            <Calendar
              currentMonth={currentMonth}
              appointments={filteredAppointments}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
            />
          </div>

        </div>

      </div>
    </div>
  );
}