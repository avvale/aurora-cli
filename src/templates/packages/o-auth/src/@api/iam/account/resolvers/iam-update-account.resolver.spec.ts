/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountResolver } from './iam-update-account.resolver';
import { IamUpdateAccountHandler } from '../handlers/iam-update-account.handler';
import { IamUpdateAccountInput } from '../../../../graphql';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountResolver', () =>
{
    let resolver: IamUpdateAccountResolver;
    let handler: IamUpdateAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateAccountResolver,
                {
                    provide : IamUpdateAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateAccountResolver>(IamUpdateAccountResolver);
        handler = module.get<IamUpdateAccountHandler>(IamUpdateAccountHandler);
    });

    test('IamUpdateAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a account created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamUpdateAccountInput>accounts[0])).toBe(accounts[0]);
        });
    });
});