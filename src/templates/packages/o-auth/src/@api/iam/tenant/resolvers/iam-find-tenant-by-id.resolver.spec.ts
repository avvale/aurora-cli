/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindTenantByIdResolver } from './iam-find-tenant-by-id.resolver';
import { IamFindTenantByIdHandler } from '../handlers/iam-find-tenant-by-id.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantByIdResolver', () =>
{
    let resolver: IamFindTenantByIdResolver;
    let handler: IamFindTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTenantByIdResolver,
                {
                    provide : IamFindTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindTenantByIdResolver>(IamFindTenantByIdResolver);
        handler = module.get<IamFindTenantByIdHandler>(IamFindTenantByIdHandler);
    });

    test('IamFindTenantByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTenantByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});