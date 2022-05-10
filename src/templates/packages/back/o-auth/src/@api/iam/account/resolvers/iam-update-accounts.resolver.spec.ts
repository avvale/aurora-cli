/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountsResolver } from './iam-update-accounts.resolver';
import { IamUpdateAccountsHandler } from '../handlers/iam-update-accounts.handler';
import { IamUpdateAccountsInput } from '../../../../graphql';

// sources
import { accounts } from '@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountsResolver', () =>
{
    let resolver: IamUpdateAccountsResolver;
    let handler: IamUpdateAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateAccountsResolver,
                {
                    provide : IamUpdateAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateAccountsResolver>(IamUpdateAccountsResolver);
        handler = module.get<IamUpdateAccountsHandler>(IamUpdateAccountsHandler);
    });

    test('IamUpdateAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accounts updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamUpdateAccountsInput>accounts[0])).toBe(accounts[0]);
        });
    });
});