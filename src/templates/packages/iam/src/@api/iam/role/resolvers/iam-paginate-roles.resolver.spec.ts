/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateRolesResolver } from './iam-paginate-roles.resolver';
import { IamPaginateRolesHandler } from '../handlers/iam-paginate-roles.handler';

// sources
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

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
        }).compile();

        resolver    = module.get<IamPaginateRolesResolver>(IamPaginateRolesResolver);
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

        test('should return a roles', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : roles,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : roles,
            });
        });
    });
});