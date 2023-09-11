import { IamCreatePermissionRoleInput } from '@api/graphql';
import { IamCreatePermissionsRolesHandler, IamCreatePermissionsRolesResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreatePermissionsRolesResolver', () =>
{
    let resolver: IamCreatePermissionsRolesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreatePermissionsRolesResolver,
                {
                    provide : IamCreatePermissionsRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamCreatePermissionsRolesResolver>(IamCreatePermissionsRolesResolver);
    });

    test('IamCreatePermissionsRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissionsRoles created', async () =>
        {
            expect(await resolver.main(<IamCreatePermissionRoleInput[]>iamMockPermissionRoleData)).toBe(undefined);
        });
    });
});
