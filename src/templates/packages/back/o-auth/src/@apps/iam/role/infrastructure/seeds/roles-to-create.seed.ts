/* eslint-disable max-len */
/**
 * This mock file is different from the table structure, because when creating an roles, specific fields are required.
 * specific fields, in the process of creating the role you obtain the necessary data to populate the table.
 * the table. For this reason to perform testing we need two different data structures, a list of roles, which would be a list of
 * of roles, which would be the one already registered in the database and a list of roles that would be necessary to generate an role in the database.
 * to generate an role in the database.
 */

import { permissions } from '../../../permission/infrastructure/seeds/permission.seed';

export const rolesToCreate = [
    {
        id           : '99b06044-fff5-4267-9314-4bae9f909010',
        name         : 'Administrador',
        isMaster     : true,
        permissionIds: ['4c1c3941-8106-4583-aadb-6c7a39593230', '2804b0ee-a39a-4d11-b2d5-1cf85c175738', 'f5162e55-90c9-4487-aaf8-72d76e471605', 'a4cfe637-b396-4c87-9df3-aea19d0f632b'],
        accountIds   : ['4e0efbd7-1a3f-47b7-a7e6-a1b9d0f99f06', '13dddf36-4d86-48b0-86e3-8dde22c20d49', '54a878c1-9a08-4125-8689-6da4402485ff'],
        permissions, // mock related permissions
    },
];