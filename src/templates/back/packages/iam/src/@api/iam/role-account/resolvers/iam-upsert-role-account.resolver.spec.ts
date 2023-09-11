/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateRoleAccountByIdInput } from '@api/graphql';
import { IamUpsertRoleAccountHandler, IamUpsertRoleAccountResolver } from '@api/iam/role-account';
import { iamMockRoleAccountData } from '@app/iam/role-account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleAccountResolver', () =>
{
    let resolver: IamUpsertRoleAccountResolver;
    let handler: IamUpsertRoleAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertRoleAccountResolver,
                {
                    provide : IamUpsertRoleAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertRoleAccountResolver>(IamUpsertRoleAccountResolver);
        handler = module.get<IamUpsertRoleAccountHandler>(IamUpsertRoleAccountHandler);
    });

    test('IamUpsertRoleAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertRoleAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an roleAccount upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleAccountData[0])));
            expect(await resolver.main(<IamUpdateRoleAccountByIdInput>iamMockRoleAccountData[0])).toBe(iamMockRoleAccountData[0]);
        });
    });
});
