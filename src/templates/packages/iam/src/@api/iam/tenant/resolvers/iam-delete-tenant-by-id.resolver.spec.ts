/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteTenantByIdResolver } from './iam-delete-tenant-by-id.resolver';
import { IamDeleteTenantByIdHandler } from '../handlers/iam-delete-tenant-by-id.handler';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamDeleteTenantByIdResolver', () =>
{
    let resolver: IamDeleteTenantByIdResolver;
    let handler: IamDeleteTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteTenantByIdResolver,
                {
                    provide : IamDeleteTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteTenantByIdResolver>(IamDeleteTenantByIdResolver);
        handler = module.get<IamDeleteTenantByIdHandler>(IamDeleteTenantByIdHandler);
    });

    test('IamDeleteTenantByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteTenantByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});