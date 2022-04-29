// ignored file
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { IamAccountType } from '../../../../../graphql';
import { users } from '../../../user/infrastructure/seeds/user.seed';

export const accounts = [
    {
        id: '948a5308-a49d-42dc-9ea3-7490e120000b',
        type: IamAccountType.USER,
        email: 'john.doe@gmail.com',
        isActive: true,
        clientId: '333910d9-394b-42d7-b3e0-0c7ae7a54478',
        dApplicationCodes: ['aurora'],
        dPermissions: {},
        dTenants: [],
        data: null,
        roleIds: [],
        tenantIds: [],
        user: users[0],
    },
];