/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetAccountsResolver } from './iam-get-accounts.resolver';
import { IamGetAccountsHandler } from '../handlers/iam-get-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamGetAccountsResolver', () =>
{
    let resolver: IamGetAccountsResolver;
    let handler: IamGetAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetAccountsResolver,
                {
                    provide : IamGetAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetAccountsResolver>(IamGetAccountsResolver);
        handler = module.get<IamGetAccountsHandler>(IamGetAccountsHandler);
    });

    test('IamGetAccountsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetAccountsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a accounts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts)));
            expect(await resolver.main()).toBe(accounts);
        });
    });
});