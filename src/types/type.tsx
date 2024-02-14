
//== Types == //
export interface Doctor {
    id: string;
    personDetails: {
      id: string;
      pictureUrl: string;
      firstName: string;
      lastName: string; };
    specialization: string;
    departmentName: string;
    altText: string;
   
}


export interface MockDoctor {
    id: number;
    name: string;
    specialization: string;
    departmentName: string;
    imgUrl: string;
    altText: string;
    
}

export interface TimeSlotData {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

export interface Message {
    message: string;
}

export interface Booking {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    selectedDate: Date | null;
    selectedTimeSlot: string | null;
}

export interface AppointmentBookingDTO {
  doctorId: string;
  patientName: string;
  date: Date | null;
  email: string;
  timeSlotId: string;
  reason: string;
}

export interface AppointmentState {
  selectedDoctor: Doctor | null;
  appointmentType: string;
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlotData | null;
  bookingDTO: AppointmentBookingDTO | null,
  appointmentMsg: string;
  bookingStep: string;
  loading: boolean;
}

export interface AppointmentAction {
  type: string;
  payload: any;
}

export interface AppointmentContextProps {
  state: AppointmentState;
  dispatch: React.Dispatch<AppointmentAction>;
}




