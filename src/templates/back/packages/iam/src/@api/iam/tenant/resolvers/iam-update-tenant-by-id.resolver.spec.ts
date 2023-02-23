/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantByIdResolver } from './iam-update-tenant-by-id.resolver';
import { IamUpdateTenantByIdHandler } from '../handlers/iam-update-tenant-by-id.handler';
import { IamUpdateTenantByIdInput } from '@api/graphql';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantByIdResolver', () =>
{
    let resolver: IamUpdateTenantByIdResolver;
    let handler: IamUpdateTenantByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTenantByIdResolver,
                {
                    provide : IamUpdateTenantByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateTenantByIdResolver>(IamUpdateTenantByIdResolver);
        handler = module.get<IamUpdateTenantByIdHandler>(IamUpdateTenantByIdHandler);
    });

    test('IamUpdateTenantByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTenantByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tenant by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<IamUpdateTenantByIdInput>tenants[0])).toBe(tenants[0]);
        });
    });
});