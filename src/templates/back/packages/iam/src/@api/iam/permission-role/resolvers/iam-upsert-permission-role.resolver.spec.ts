/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdatePermissionRoleByIdInput } from '@api/graphql';
import { IamUpsertPermissionRoleHandler, IamUpsertPermissionRoleResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertPermissionRoleResolver', () =>
{
    let resolver: IamUpsertPermissionRoleResolver;
    let handler: IamUpsertPermissionRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertPermissionRoleResolver,
                {
                    provide : IamUpsertPermissionRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertPermissionRoleResolver>(IamUpsertPermissionRoleResolver);
        handler = module.get<IamUpsertPermissionRoleHandler>(IamUpsertPermissionRoleHandler);
    });

    test('IamUpsertPermissionRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissionRole upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await resolver.main(<IamUpdatePermissionRoleByIdInput>iamMockPermissionRoleData[0])).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
