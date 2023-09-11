/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindPermissionRoleHandler, IamFindPermissionRoleResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleResolver', () =>
{
    let resolver: IamFindPermissionRoleResolver;
    let handler: IamFindPermissionRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindPermissionRoleResolver,
                {
                    provide : IamFindPermissionRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindPermissionRoleResolver>(IamFindPermissionRoleResolver);
        handler = module.get<IamFindPermissionRoleHandler>(IamFindPermissionRoleHandler);
    });

    test('IamFindPermissionRoleResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindPermissionRoleResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a permissionRole', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await resolver.main()).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
