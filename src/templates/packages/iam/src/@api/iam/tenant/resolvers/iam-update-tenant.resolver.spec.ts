/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateTenantResolver } from './iam-update-tenant.resolver';
import { IamUpdateTenantHandler } from '../handlers/iam-update-tenant.handler';
import { IamUpdateTenantInput } from '../../../../graphql';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpdateTenantResolver', () =>
{
    let resolver: IamUpdateTenantResolver;
    let handler: IamUpdateTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateTenantResolver,
                {
                    provide : IamUpdateTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateTenantResolver>(IamUpdateTenantResolver);
        handler = module.get<IamUpdateTenantHandler>(IamUpdateTenantHandler);
    });

    test('IamUpdateTenantResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateTenantResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a tenant created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<IamUpdateTenantInput>tenants[0])).toBe(tenants[0]);
        });
    });
});