import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface CalendarProps {
  currentMonth: Date;
  appointments: Appointment[];
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

export default function Calendar({
  currentMonth,
  appointments,
  handlePrevMonth,
  handleNextMonth,
}: CalendarProps) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return appointments.filter(apt => apt.app_date === dateStr);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
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

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 py-2 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map(i => (
          <div
            key={`empty-${i}`}
            className="h-32 bg-gray-50 rounded-lg"
          />
        ))}

        {days.map(day => {
          const dayAppointments = getAppointmentsForDate(day);

          return (
            <div
              key={day}
              className="h-32 p-2 rounded-lg border-2 overflow-y-auto border-gray-200 bg-white"
            >
              <div className="text-sm font-semibold mb-2 text-gray-700">
                {day}
              </div>

              <div className="space-y-1">
                {dayAppointments.map(apt => (
                  <div
                    key={apt.id}
                    className="text-xs bg-blue-100 text-blue-800 p-1 rounded truncate"
                  >
                    {apt.app_time} - {apt.customer_name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}