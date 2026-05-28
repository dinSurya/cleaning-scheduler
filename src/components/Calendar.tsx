import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Appointment } from "@/types/appointment";

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

    return appointments
      .filter(apt => apt.app_date === dateStr)
      .sort((a, b) => {
        const timeA = new Date(`${a.app_date}T${a.app_time}`);
        const timeB = new Date(`${b.app_date}T${b.app_time}`);

        return timeA.getTime() - timeB.getTime();
      })
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  function getAppointmentStatus(apt: Appointment) {
    if (apt.status === 'canceled') {
      return 'canceled';
    }

    const start = new Date(`${apt.app_date}T${apt.app_time}`);

    const end = new Date(
      start.getTime() + apt.duration * 60 * 60 * 1000
    );

    const now = new Date();

    if (now < start) {
      return 'scheduled';
    }

    if (now >= start && now <= end) {
      return 'in_progress';
    }

    return 'completed';
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 text-center">
          {monthName}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center font-semibold text-gray-600 py-2 text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {emptyDays.map(i => (
          <div
            key={`empty-${i}`}
            className="h-32 bg-gray-50 rounded-lg"
          />
        ))}

        {days.map(day => {
          const dayAppointments = getAppointmentsForDate(day);
          const today = new Date();

          const isToday =
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();

          return (
            <div
              key={day}
              className={`min-h-[90px] sm:min-h-[120px] lg:min-h-[140px] p-2
                          rounded-2xl border transition-all overflow-hidden
                          ${isToday
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:shadow-md'
                }
                        `}>
              <div className="text-[10px] sm:text-sm uppercase tracking-wide font-semibold mb-2 text-gray-700">
                {day}
              </div>

              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map(apt => {
                  const status = getAppointmentStatus(apt);

                  return (
                    <div
                      key={apt.id}
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded-lg truncate
                                ${status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                        }
                              `}>
                      {apt.app_time} - {apt.customer_name}
                    </div>
                  );
                })}

                {dayAppointments.length > 3 && (
                  <div className="text-[10px] text-gray-500">
                    +{dayAppointments.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}