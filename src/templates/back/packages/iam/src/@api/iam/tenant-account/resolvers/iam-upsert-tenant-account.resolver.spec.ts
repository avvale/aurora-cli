/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantAccountByIdInput } from '@api/graphql';
import { IamUpsertTenantAccountHandler, IamUpsertTenantAccountResolver } from '@api/iam/tenant-account';
import { iamMockTenantAccountData } from '@app/iam/tenant-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTenantAccountResolver', () =>
{
    let resolver: IamUpsertTenantAccountResolver;
    let handler: IamUpsertTenantAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertTenantAccountResolver,
                {
                    provide : IamUpsertTenantAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertTenantAccountResolver>(IamUpsertTenantAccountResolver);
        handler = module.get<IamUpsertTenantAccountHandler>(IamUpsertTenantAccountHandler);
    });

    test('IamUpsertTenantAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertTenantAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenantAccount upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantAccountData[0])));
            expect(await resolver.main(<IamUpdateTenantAccountByIdInput>iamMockTenantAccountData[0])).toBe(iamMockTenantAccountData[0]);
        });
    });
});
