export interface AccountPermissions
{
    [key: string]: string[];
    all: string[];
}

export enum IamPermissions
{
    SUDO = 'aurora.sudo',
}