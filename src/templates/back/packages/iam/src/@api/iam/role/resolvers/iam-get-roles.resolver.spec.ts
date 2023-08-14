/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamGetRolesHandler, IamGetRolesResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamGetRolesResolver', () =>
{
    let resolver: IamGetRolesResolver;
    let handler: IamGetRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetRolesResolver,
                {
                    provide : IamGetRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamGetRolesResolver>(IamGetRolesResolver);
        handler = module.get<IamGetRolesHandler>(IamGetRolesHandler);
    });

    test('IamGetRolesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetRolesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a iamMockRoleData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData)));
            expect(await resolver.main()).toBe(iamMockRoleData);
        });
    });
});
