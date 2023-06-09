export interface RegisterInput {
    readonly email: string;
    readonly password: string;
    readonly name?: string;
    readonly state?: string;
}
