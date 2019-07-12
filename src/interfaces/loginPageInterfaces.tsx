import IAuthState from "./authInterfaces";

export default interface ILoginPageProps {
    id?: string;
    email?: string;
    password?: string;
    submit: (event: React.FormEvent) => void;
    handleChange: <T extends keyof IAuthState>(event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default interface ILoginPageState {}
