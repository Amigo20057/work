export interface IRegister {
	userName: string;
	userSurname: string;
	email: string;
	password: string;
	role: Roles;
	nameCompany?: string;
	addressCompany?: string;
}

export enum Roles {
	USER,
	ADMIN,
	RECRUITER,
}
