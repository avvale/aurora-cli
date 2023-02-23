/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertTenantResolver } from './iam-upsert-tenant.resolver';
import { IamUpsertTenantHandler } from '../handlers/iam-upsert-tenant.handler';
import { IamUpsertTenantInput } from '@api/graphql';

// sources
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamUpsertTenantResolver', () =>
{
    let resolver: IamUpsertTenantResolver;
    let handler: IamUpsertTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertTenantResolver,
                {
                    provide : IamUpsertTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertTenantResolver>(IamUpsertTenantResolver);
        handler = module.get<IamUpsertTenantHandler>(IamUpsertTenantHandler);
    });

    test('IamUpsertTenantResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertTenantResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<IamUpsertTenantInput>tenants[0])).toBe(tenants[0]);
        });
    });
});