export interface Account {
    id: string;
    email: string;
    username: string;
    isActive: boolean;
    clientId: string;
    roles?: Role[];
    dApplicationCodes: string[];
    dPermissions: AccountPermissions;
    dTenants: string[];
    scopes: string[];
    meta?: any;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface AccountPermissions {
    [key: string]: string[];
    all: string[];
}

export interface User {
    name: string;
    surname?: string;
    status: string;
    avatar?: string;
    mobile?: string;
    langId?: string;
    password?: string;
    rememberToken?: string;
    meta?: any;
}

export interface Role {
    id: string;
    name: string;
    defaultRedirection?: string;
}
