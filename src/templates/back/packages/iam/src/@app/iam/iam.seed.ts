// ignored file
import { IamAccountType } from '@api/graphql';
import { clients } from '@app/o-auth/o-auth.seed';
import { IamPermissionHelper } from '@app/iam/permission';

export const boundedContexts = [
    {
        id      : 'f405132f-786d-4a6a-a262-0e6a6518aec3',
        name    : 'Aurora',
        root    : 'app',
        sort    : 1,
        isActive: true,
    },
    {
        id      : '9e8dbba3-b82b-406f-b71f-060a0494ffba',
        name    : 'IAM',
        root    : 'iam',
        sort    : 20,
        isActive: true,
    },
];

export const permissions = [

    { id: 'c3f07181-ef34-4905-94fc-8c8af191153c',  name: 'iam.access',                               boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '270914b4-2eba-4d45-b5c2-1677f8f717a4',  name: 'iam.account.access',                       boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'dab3dcf7-e119-4b72-8498-99cf3843ca9c',  name: 'iam.account.get',                          boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '89048ea7-af7a-4466-8ef4-5bf74e1a481e',  name: 'iam.account.create',                       boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '830f13b6-6f20-4af8-80c2-f7fa91949901',  name: 'iam.account.update',                       boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'bca4250e-98e5-4158-9702-49dfb627841a',  name: 'iam.account.upsert',                       boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '887e1312-fac9-44cc-b739-cb51b13abafc',  name: 'iam.account.delete',                       boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '9a37e368-b418-4d62-ad60-3b0110e4635f',  name: 'iam.boundedContext.access',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'a905711d-4c69-486a-8e54-63e088ba55e7',  name: 'iam.boundedContext.get',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '848a5574-1e35-4e29-8438-18404e31a951',  name: 'iam.boundedContext.create',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '7bed6bc3-49bf-4c19-9caa-fa224fa4521b',  name: 'iam.boundedContext.update',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'b4a091e4-85ac-4a34-8a7b-7a397c556664',  name: 'iam.boundedContext.upsert',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'ad2c9d97-f715-4397-8887-8470086db1f2',  name: 'iam.boundedContext.delete',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '1d7d1492-ed1c-477d-bce7-1f4106cc929e',  name: 'iam.permission.access',                    boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '285a0d60-d67d-4414-8ec4-30bfc86a78d3',  name: 'iam.permission.get',                       boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'b5406a8a-6e12-4ec6-b04b-b7f05cdb1521',  name: 'iam.permission.create',                    boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'd5eca3c5-7a50-4d5f-b49a-4058d7cc4e65',  name: 'iam.permission.update',                    boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'f4bdfaab-059c-41af-9e4c-27d5ee92cc18',  name: 'iam.permission.upsert',                    boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'b7b0d036-9636-4abe-bdf5-07e562c23e75',  name: 'iam.permission.delete',                    boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '51d0ea94-2138-45b1-91ca-c150c8cdea48',  name: 'iam.role.access',                          boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '3fd068ff-3e02-42eb-a174-478f80c5ffba',  name: 'iam.role.get',                             boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '03eff917-097a-41db-9401-f73e63fec943',  name: 'iam.role.create',                          boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'da1fed40-38ab-4183-a0e8-cedbc210fcdf',  name: 'iam.role.update',                          boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '1d9c5821-f952-42d4-b468-a27901aebf1f',  name: 'iam.role.upsert',                          boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'eddb42c6-ffc6-465a-9bb1-42185b1003a3',  name: 'iam.role.delete',                          boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '096ac555-09a8-4603-b082-5e1e1ad51db1',  name: 'iam.tenant.access',                        boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '42ec287d-ea16-4a2f-9ad6-d2fe99304f18',  name: 'iam.tenant.get',                           boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '4bf07675-d824-4d87-8589-73f98adc1909',  name: 'iam.tenant.create',                        boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '0929febd-ad0f-4168-b342-0f2d055612a8',  name: 'iam.tenant.update',                        boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'c5ff152a-d94a-44c1-9332-09a25b849a0b',  name: 'iam.tenant.upsert',                        boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'b909d1ef-b7aa-4354-b0e5-5cfed12a88d3',  name: 'iam.tenant.delete',                        boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '85926b32-50db-4a6d-9bbe-bd076ca08e33',  name: 'iam.userData.get',                         boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'afc4219b-8944-4fbc-98e8-ec525f2ddd92',  name: 'iam.userData.update',                      boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '6e6188c9-1a9d-4433-98ed-2d2f76339761',  name: 'iam.permissionRole.access',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'd92aa0c0-de61-4e2d-937c-6da3a53c0526',  name: 'iam.permissionRole.get',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'd8a8f869-fdf4-4421-afff-c3e6dbc75cd4',  name: 'iam.permissionRole.create',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'fbb85751-2c85-4a1f-b678-25ac11bba831',  name: 'iam.permissionRole.update',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '3e1076d2-c739-4c4d-b669-97ca67223e41',  name: 'iam.permissionRole.upsert',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'd7e1caf9-8440-4cea-bf61-0eb680becca4',  name: 'iam.permissionRole.delete',                boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '48b2e157-8458-452e-be43-e560ed290b23',  name: 'iam.roleAccount.access',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '0fb70471-8d14-4f71-ba25-0bc09304e245',  name: 'iam.roleAccount.get',                      boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '4da99ac3-92c8-4d1d-bc2d-1d84df1e319d',  name: 'iam.roleAccount.create',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '45ce17f6-3d28-4260-ada7-43e8ef6cab2a',  name: 'iam.roleAccount.update',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '0c28bac1-69ae-4c07-90ff-8c3c0a0020d8',  name: 'iam.roleAccount.upsert',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '3d887f07-a61e-4c34-9359-29de8465ae65',  name: 'iam.roleAccount.delete',                   boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},

    { id: '3b7b5c53-ccfc-42a3-8ec3-b4c75281c867',  name: 'iam.tenantAccount.access',                 boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '290a788d-0fb0-49d1-81be-bb72490a9cd6',  name: 'iam.tenantAccount.get',                    boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'd990f317-3a77-40f6-ad83-136e925c583c',  name: 'iam.tenantAccount.create',                 boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'd1023124-8d33-4dab-a043-4ae890239d95',  name: 'iam.tenantAccount.update',                 boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: 'ba0d87b7-b31d-4211-9751-713cad9704ad',  name: 'iam.tenantAccount.upsert',                 boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
    { id: '4d48139b-4722-4e37-af10-c488941a2184',  name: 'iam.tenantAccount.delete',                 boundedContextId: '9e8dbba3-b82b-406f-b71f-060a0494ffba', roleIds: []},
];

export const users = [
    {
        id           : IamPermissionHelper.administratorUserId,
        accountId    : IamPermissionHelper.administratorAccountId,
        name         : 'John',
        surname      : 'Doe',
        avatar       : null,
        mobile       : null,
        langId       : null,
        username     : 'john.doe@contoso.com',
        password     : '1111',
        rememberToken: null,
        data         : null,
    },
];

export const accounts = [
    // administrator account
    {
        id               : IamPermissionHelper.administratorAccountId,
        type             : IamAccountType.USER,
        code             : null,
        email            : 'john.doe@contoso.com',
        isActive         : true,
        clientId         : clients[0].id,
        dApplicationCodes: ['orion'],
        dPermissions     : {},
        dTenants         : [],
        dScopes          : ['GDO','DRIVER','LOADER','CARRIER'],
        data             : null,
        roleIds          : [],
        tenantIds        : [],
        user             : users[0],
    },
];

export const roles = [
    {
        id      : IamPermissionHelper.administratorRoleId,
        name    : 'Administrator',
        isMaster: true,
        permissions, // mock related permissions
    },
];