
//== Types == //
export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    departmentName: string;
    imgUrl: string;
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

export interface Message {
    message: string;
}

export interface Booking {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    selectedDate: Date | null;
    selectedTimeSlot: string | null;
}

export interface AppointmentState {
  selectedDoctor: MockDoctor | null;
  appointmentType: string;
  selectedDate: Date | null;
  selectedTimeSlot: string;
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




