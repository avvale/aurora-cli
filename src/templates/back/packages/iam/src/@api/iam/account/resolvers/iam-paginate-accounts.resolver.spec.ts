/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamPaginateAccountsHandler, IamPaginateAccountsResolver } from '@api/iam/account';
import { iamMockAccountData } from '@app/iam/account';
import { Test, TestingModule } from '@nestjs/testing';

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
        })
            .compile();

        resolver = module.get<IamPaginateAccountsResolver>(IamPaginateAccountsResolver);
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

        test('should return a iamMockAccountData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : iamMockAccountData,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : iamMockAccountData,
            });
        });
    });
});
