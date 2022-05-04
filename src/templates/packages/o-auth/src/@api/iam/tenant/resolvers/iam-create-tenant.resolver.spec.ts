/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateTenantResolver } from './iam-create-tenant.resolver';
import { IamCreateTenantHandler } from '../handlers/iam-create-tenant.handler';
import { IamCreateTenantInput } from '../../../../graphql';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamCreateTenantResolver', () =>
{
    let resolver: IamCreateTenantResolver;
    let handler: IamCreateTenantHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateTenantResolver,
                {
                    provide : IamCreateTenantHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateTenantResolver>(IamCreateTenantResolver);
        handler = module.get<IamCreateTenantHandler>(IamCreateTenantHandler);
    });

    test('IamCreateTenantResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateTenantResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<IamCreateTenantInput>tenants[0])).toBe(tenants[0]);
        });
    });
});