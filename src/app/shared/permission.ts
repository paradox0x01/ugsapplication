export interface Permission {
    response(response: any): void;
    _id: string;
    employe: string;
    typePermission: string;
    dateDebut: Date;
    dateFin: Date;
    raison: string;
}
