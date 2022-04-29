import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateAccountsResolver } from './iam-create-accounts.resolver';
import { IamCreateAccountsHandler } from '../handlers/iam-create-accounts.handler';
import { IamCreateAccountInput } from '../../../../graphql';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamCreateAccountsResolver', () =>
{
    let resolver: IamCreateAccountsResolver;
    let handler: IamCreateAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateAccountsResolver,
                {
                    provide : IamCreateAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateAccountsResolver>(IamCreateAccountsResolver);
        handler = module.get<IamCreateAccountsHandler>(IamCreateAccountsHandler);
    });

    test('IamCreateAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accounts created', async () =>
        {
            expect(await resolver.main(<IamCreateAccountInput[]>accounts)).toBe(undefined);
        });
    });
});