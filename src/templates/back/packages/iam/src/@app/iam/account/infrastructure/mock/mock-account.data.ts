// ignored file
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamAccountType } from '@api/graphql';
import { users } from '../../../user/infrastructure/mock/mock-user.data';

export const accounts = [
    // account demo
    {
        id: 'f0af6bd6-ddee-41bf-a1dd-cb0affa8081f',
        type: IamAccountType.USER,
        code: null,
        email: 'john.doe@refrival.com',
        isActive: true,
        clientId: '5ac621dc-be2c-4e84-a4e4-6a08cc5a8488',
        dApplicationCodes: ['orion'],
        dPermissions: {},
        dTenants: [],
        dScopes: ['GDO','DRIVER','LOADER','CARRIER'],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[0],
    },
];