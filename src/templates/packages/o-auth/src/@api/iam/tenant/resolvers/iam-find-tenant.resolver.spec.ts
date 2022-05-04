/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindTenantResolver } from './iam-find-tenant.resolver';
import { IamFindTenantHandler } from '../handlers/iam-find-tenant.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantResolver', () =>
{
    let resolver: IamFindTenantResolver;
    let handler: IamFindTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTenantResolver,
                {
                    provide : IamFindTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindTenantResolver>(IamFindTenantResolver);
        handler = module.get<IamFindTenantHandler>(IamFindTenantHandler);
    });

    test('IamFindTenantResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTenantResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tenant', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main()).toBe(tenants[0]);
        });
    });
});