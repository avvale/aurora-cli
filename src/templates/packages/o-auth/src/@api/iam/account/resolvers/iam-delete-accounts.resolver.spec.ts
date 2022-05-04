/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteAccountsResolver } from './iam-delete-accounts.resolver';
import { IamDeleteAccountsHandler } from '../handlers/iam-delete-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamDeleteAccountsResolver', () =>
{
    let resolver: IamDeleteAccountsResolver;
    let handler: IamDeleteAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteAccountsResolver,
                {
                    provide : IamDeleteAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteAccountsResolver>(IamDeleteAccountsResolver);
        handler = module.get<IamDeleteAccountsHandler>(IamDeleteAccountsHandler);
    });

    test('IamDeleteAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accounts deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts)));
            expect(await resolver.main()).toBe(accounts);
        });
    });
});