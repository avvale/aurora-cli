import { IamCreateTenantInput } from '@api/graphql';
import { IamCreateTenantsHandler, IamCreateTenantsResolver } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateTenantsResolver', () =>
{
    let resolver: IamCreateTenantsResolver;

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
        })
            .compile();

        resolver = module.get<IamCreateTenantsResolver>(IamCreateTenantsResolver);
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
            expect(await resolver.main(<IamCreateTenantInput[]>iamMockTenantData)).toBe(undefined);
        });
    });
});
