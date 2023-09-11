/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionsRolesInput } from '@api/graphql';
import { IamUpdatePermissionsRolesHandler, IamUpdatePermissionsRolesResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionsRolesResolver', () =>
{
    let resolver: IamUpdatePermissionsRolesResolver;
    let handler: IamUpdatePermissionsRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionsRolesResolver,
                {
                    provide : IamUpdatePermissionsRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdatePermissionsRolesResolver>(IamUpdatePermissionsRolesResolver);
        handler = module.get<IamUpdatePermissionsRolesHandler>(IamUpdatePermissionsRolesHandler);
    });

    test('IamUpdatePermissionsRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionsRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permissionsRoles updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await resolver.main(<IamUpdatePermissionsRolesInput>iamMockPermissionRoleData[0])).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
