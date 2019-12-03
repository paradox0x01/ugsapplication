export interface Timesheet {
    _id: string;
    employe: string;
    date: Date;
    heureDebut: Date;
    heureFin: Date;
    status: boolean;
    remarques: string;
}
