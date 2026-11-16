import { Appointment, Chamber } from '../types';
import { DOCTOR_INFO } from '../data/initialData';

/**
 * Generates an iCalendar (.ics) RFC 5545 format string and triggers client-side download
 */
export function downloadAppointmentIcs(appointment: Appointment, chamber?: Chamber) {
  // Parse date and time into UTC / Local format
  // Example appointment.date: "2026-11-09", timeSlot: "05:30 PM"
  const [year, month, day] = appointment.date.split('-').map(Number);
  
  let hours = 17;
  let minutes = 30;
  if (appointment.timeSlot) {
    const match = appointment.timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      const isPm = match[3].toUpperCase() === 'PM';
      if (isPm && hours < 12) hours += 12;
      if (!isPm && hours === 12) hours = 0;
    }
  }

  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 minutes consultation

  const formatDateIcs = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  const startFormatted = formatDateIcs(startDate);
  const endFormatted = formatDateIcs(endDate);
  const nowFormatted = formatDateIcs(new Date());

  const chamberLocation = chamber ? `${chamber.name}, ${chamber.address}` : appointment.chamberName;

  const description = [
    `Patient: ${appointment.patientName} (Ref: ${appointment.referenceCode})`,
    `Consultation: ${appointment.consultationType.replace('_', ' ').toUpperCase()}`,
    `Doctor: ${DOCTOR_INFO.name}`,
    `Specialist: ${DOCTOR_INFO.specialty}`,
    `Hospital: ${chamberLocation}`,
    `Chief Complaint: ${appointment.chiefComplaint}`,
    `Important: Please bring all previous MRI, CT, and X-Ray scan films and current prescription files 15 minutes before scheduled slot.`
  ].join('\\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dr. Faisal Amin Ahmed Orthopedic Clinic//Appointments//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${appointment.referenceCode}-${Date.now()}@drfaisalaminahmed.org`,
    `DTSTAMP:${nowFormatted}Z`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:Medical Consultation with ${DOCTOR_INFO.shortTitle}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${chamberLocation}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Appointment with ${DOCTOR_INFO.shortTitle} in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Appointment_${appointment.referenceCode}_Dr_Faisal.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
