/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteAccountByIdResolver } from './iam-delete-account-by-id.resolver';
import { IamDeleteAccountByIdHandler } from '../handlers/iam-delete-account-by-id.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamDeleteAccountByIdResolver', () =>
{
    let resolver: IamDeleteAccountByIdResolver;
    let handler: IamDeleteAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteAccountByIdResolver,
                {
                    provide : IamDeleteAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteAccountByIdResolver>(IamDeleteAccountByIdResolver);
        handler = module.get<IamDeleteAccountByIdHandler>(IamDeleteAccountByIdHandler);
    });

    test('IamDeleteAccountByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteAccountByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});