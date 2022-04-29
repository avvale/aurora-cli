/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindAccountByIdResolver } from './iam-find-account-by-id.resolver';
import { IamFindAccountByIdHandler } from '../handlers/iam-find-account-by-id.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamFindAccountByIdResolver', () =>
{
    let resolver: IamFindAccountByIdResolver;
    let handler: IamFindAccountByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindAccountByIdResolver,
                {
                    provide : IamFindAccountByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindAccountByIdResolver>(IamFindAccountByIdResolver);
        handler = module.get<IamFindAccountByIdHandler>(IamFindAccountByIdHandler);
    });

    test('IamFindAccountByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindAccountByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});