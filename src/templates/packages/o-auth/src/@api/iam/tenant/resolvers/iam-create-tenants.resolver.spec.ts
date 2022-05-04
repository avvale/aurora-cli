import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateTenantsResolver } from './iam-create-tenants.resolver';
import { IamCreateTenantsHandler } from '../handlers/iam-create-tenants.handler';
import { IamCreateTenantInput } from '../../../../graphql';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamCreateTenantsResolver', () =>
{
    let resolver: IamCreateTenantsResolver;
    let handler: IamCreateTenantsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsResolver,
                {
                    provide : IamCreateTenantsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateTenantsResolver>(IamCreateTenantsResolver);
        handler = module.get<IamCreateTenantsHandler>(IamCreateTenantsHandler);
    });

    test('IamCreateTenantsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateTenantsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenants created', async () =>
        {
            expect(await resolver.main(<IamCreateTenantInput[]>tenants)).toBe(undefined);
        });
    });
});