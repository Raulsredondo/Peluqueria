export class Event2Model {
    _id: string;
    usuid: string;
    usunombre: string;
    usuemail: string;
    id: string;
    title: string;
    desc: string;
    servicio: [
        { 'servicio': 'corte de caballero 10€' },
        { 'servicio': 'corte barba de caballero 5€' },
        { 'servicio': 'corte de barba y cabello 15€' }
    ]
    serviociosele: string;
    startTime: Date;
    endTime: Date;
    allDay: false
};