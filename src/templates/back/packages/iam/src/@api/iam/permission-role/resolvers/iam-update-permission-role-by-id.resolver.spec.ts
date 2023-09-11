/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionRoleByIdInput } from '@api/graphql';
import { IamUpdatePermissionRoleByIdHandler, IamUpdatePermissionRoleByIdResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdatePermissionRoleByIdResolver', () =>
{
    let resolver: IamUpdatePermissionRoleByIdResolver;
    let handler: IamUpdatePermissionRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdatePermissionRoleByIdResolver,
                {
                    provide : IamUpdatePermissionRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdatePermissionRoleByIdResolver>(IamUpdatePermissionRoleByIdResolver);
        handler = module.get<IamUpdatePermissionRoleByIdHandler>(IamUpdatePermissionRoleByIdHandler);
    });

    test('IamUpdatePermissionRoleByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionRoleByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permissionRole by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await resolver.main(<IamUpdatePermissionRoleByIdInput>iamMockPermissionRoleData[0])).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
