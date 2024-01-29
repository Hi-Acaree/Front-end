
//== Types == //
export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    departmentName: string;
    imgUrl: string;
    altText: string;
    // ...other properties
}


export interface MockDoctor {
    id: number;
    name: string;
    specialization: string;
    departmentName: string;
    imgUrl: string;
    altText: string;
    // ...other properties
}

export interface Message {
    message: string;
}

export interface Booking {
    doctors: Doctor[];
    selectedDoctor: Doctor | null;
    selectedDate: Date;
    selectedTimeSlot: string | null;
}

export interface AppointmentState {
  selectedDoctor: MockDoctor | null;
  appointmentType: string;
  selectedDate: Date;
  selectedTimeSlot: string;
  appointmentMsg: string;
  bookingStep: string;
}


