/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamDeletePermissionsRolesHandler, IamDeletePermissionsRolesResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeletePermissionsRolesResolver', () =>
{
    let resolver: IamDeletePermissionsRolesResolver;
    let handler: IamDeletePermissionsRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeletePermissionsRolesResolver,
                {
                    provide : IamDeletePermissionsRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamDeletePermissionsRolesResolver>(IamDeletePermissionsRolesResolver);
        handler = module.get<IamDeletePermissionsRolesHandler>(IamDeletePermissionsRolesHandler);
    });

    test('IamDeletePermissionsRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeletePermissionsRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an iamMockPermissionRoleData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData)));
            expect(await resolver.main()).toBe(iamMockPermissionRoleData);
        });
    });
});
