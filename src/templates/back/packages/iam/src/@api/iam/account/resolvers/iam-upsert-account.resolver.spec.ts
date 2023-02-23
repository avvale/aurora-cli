/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertAccountResolver } from './iam-upsert-account.resolver';
import { IamUpsertAccountHandler } from '../handlers/iam-upsert-account.handler';
import { IamUpsertAccountInput } from '@api/graphql';

// sources
import { accounts } from '@app/iam/account/infrastructure/mock/mock-account.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamUpsertAccountInput>accounts[0])).toBe(accounts[0]);
        });
    });
});