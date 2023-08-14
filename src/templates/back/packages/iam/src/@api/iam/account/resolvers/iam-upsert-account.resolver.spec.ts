/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamUpdateAccountByIdInput } from '@api/graphql';
import { IamUpsertAccountHandler, IamUpsertAccountResolver } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertAccountResolver', () =>
{
    let resolver: IamUpsertAccountResolver;
    let handler: IamUpsertAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertAccountResolver,
                {
                    provide : IamUpsertAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertAccountResolver>(IamUpsertAccountResolver);
        handler = module.get<IamUpsertAccountHandler>(IamUpsertAccountHandler);
    });

    test('IamUpsertAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockAccountData[0])));
            expect(await resolver.main(<IamUpdateAccountByIdInput>iamMockAccountData[0])).toBe(iamMockAccountData[0]);
        });
    });
});
