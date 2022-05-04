/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateAccountsResolver } from './iam-paginate-accounts.resolver';
import { IamPaginateAccountsHandler } from '../handlers/iam-paginate-accounts.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamPaginateAccountsResolver', () =>
{
    let resolver: IamPaginateAccountsResolver;
    let handler: IamPaginateAccountsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateAccountsResolver,
                {
                    provide : IamPaginateAccountsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver    = module.get<IamPaginateAccountsResolver>(IamPaginateAccountsResolver);
        handler = module.get<IamPaginateAccountsHandler>(IamPaginateAccountsHandler);
    });

    test('IamPaginateAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a accounts', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : accounts,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : accounts,
            });
        });
    });
});