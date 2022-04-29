/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateTenantsResolver } from './iam-paginate-tenants.resolver';
import { IamPaginateTenantsHandler } from '../handlers/iam-paginate-tenants.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamPaginateTenantsResolver', () =>
{
    let resolver: IamPaginateTenantsResolver;
    let handler: IamPaginateTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateTenantsResolver,
                {
                    provide : IamPaginateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver    = module.get<IamPaginateTenantsResolver>(IamPaginateTenantsResolver);
        handler = module.get<IamPaginateTenantsHandler>(IamPaginateTenantsHandler);
    });

    test('IamPaginateTenantsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tenants', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : tenants,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : tenants,
            });
        });
    });
});