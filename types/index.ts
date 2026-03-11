export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    icon: string;
}

export interface BookingFormData {
    userName: string;
    userEmail: string;
    date: string;
    time: string;
}
