// Note: This is the configuration file for the application

interface AppConfigProps {
    apiAppointmentBaseUrl: string;
    apiDoctorBaseUrl: string;
    apiDoctorAvailabilityUrl: string;
    apiDoctorListUrl: string;
    apiPersonBaseUrl: string;
}

const AppConfig: AppConfigProps = {
	apiAppointmentBaseUrl: process.env.REACT_APP_APPOINTMENT_API_BASE_URL || "http://localhost:8080/api/v1/appointment",
	apiDoctorBaseUrl: process.env.REACT_APP_DOCTOR_API_BASE_URL || "http://localhost:8080/api/v1/doctor",
	apiDoctorAvailabilityUrl: process.env.REACT_APP_DOCTOR_AVAILABILITY_URL || "http://localhost:8080/api/v1/appointment/availableTimeSlots",
	apiDoctorListUrl: process.env.REACT_APP_DOCTOR_LIST_URL || "http://localhost:8080/api/v1/doctor/all",
	apiPersonBaseUrl: process.env.REACT_APP_PERSON_API_BASE_URL || "http://localhost:8080/api/v1/person",

};

export default AppConfig;
