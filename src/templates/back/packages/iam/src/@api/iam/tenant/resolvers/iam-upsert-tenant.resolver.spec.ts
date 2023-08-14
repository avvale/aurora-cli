/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateTenantByIdInput } from '@api/graphql';
import { IamUpsertTenantHandler, IamUpsertTenantResolver } from '@api/iam/tenant';
import { iamMockTenantData } from '@app/iam/tenant';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockTenantData[0])));
            expect(await resolver.main(<IamUpdateTenantByIdInput>iamMockTenantData[0])).toBe(iamMockTenantData[0]);
        });
    });
});
