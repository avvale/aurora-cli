/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindAccountResolver } from './iam-find-account.resolver';
import { IamFindAccountHandler } from '../handlers/iam-find-account.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamFindAccountResolver', () =>
{
    let resolver: IamFindAccountResolver;
    let handler: IamFindAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindAccountResolver,
                {
                    provide : IamFindAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindAccountResolver>(IamFindAccountResolver);
        handler = module.get<IamFindAccountHandler>(IamFindAccountHandler);
    });

    test('IamFindAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a account', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main()).toBe(accounts[0]);
        });
    });
});