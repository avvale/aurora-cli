/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateRolesHandler, IamPaginateRolesResolver } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamPaginateRolesResolver', () =>
{
    let resolver: IamPaginateRolesResolver;
    let handler: IamPaginateRolesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateRolesResolver,
                {
                    provide : IamPaginateRolesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamPaginateRolesResolver>(IamPaginateRolesResolver);
        handler = module.get<IamPaginateRolesHandler>(IamPaginateRolesHandler);
    });

    test('IamPaginateRolesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateRolesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a iamMockRoleData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : iamMockRoleData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : iamMockRoleData,
            });
        });
    });
});
