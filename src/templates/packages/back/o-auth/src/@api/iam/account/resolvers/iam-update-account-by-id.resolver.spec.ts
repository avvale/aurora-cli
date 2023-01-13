/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateAccountByIdResolver } from './iam-update-account-by-id.resolver';
import { IamUpdateAccountByIdHandler } from '../handlers/iam-update-account-by-id.handler';
import { IamUpdateAccountByIdInput } from '@api/graphql';

// sources
import { accounts } from '@app/iam/account/infrastructure/seeds/account.seed';

describe('IamUpdateAccountByIdResolver', () =>
{
    let resolver: IamUpdateAccountByIdResolver;
    let handler: IamUpdateAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateAccountByIdResolver,
                {
                    provide : IamUpdateAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateAccountByIdResolver>(IamUpdateAccountByIdResolver);
        handler = module.get<IamUpdateAccountByIdHandler>(IamUpdateAccountByIdHandler);
    });

    test('IamUpdateAccountByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateAccountByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a account by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamUpdateAccountByIdInput>accounts[0])).toBe(accounts[0]);
        });
    });
});