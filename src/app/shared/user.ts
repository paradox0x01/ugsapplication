export interface User {
    token(token: any): void;
    _id: string;
    employe: {
      nom_prenoms: string
    };
    username: string;
    password: string;
}
