/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamFindPermissionRoleByIdHandler, IamFindPermissionRoleByIdResolver } from '@api/iam/permission-role';
import { iamMockPermissionRoleData } from '@app/iam/permission-role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindPermissionRoleByIdResolver', () =>
{
    let resolver: IamFindPermissionRoleByIdResolver;
    let handler: IamFindPermissionRoleByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindPermissionRoleByIdResolver,
                {
                    provide : IamFindPermissionRoleByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindPermissionRoleByIdResolver>(IamFindPermissionRoleByIdResolver);
        handler = module.get<IamFindPermissionRoleByIdHandler>(IamFindPermissionRoleByIdHandler);
    });

    test('IamFindPermissionRoleByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindPermissionRoleByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissionRole by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionRoleData[0])));
            expect(await resolver.main(iamMockPermissionRoleData[0].id)).toBe(iamMockPermissionRoleData[0]);
        });
    });
});
