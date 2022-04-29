/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserResolver } from './iam-find-user.resolver';
import { IamFindUserHandler } from '../handlers/iam-find-user.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserResolver', () =>
{
    let resolver: IamFindUserResolver;
    let handler: IamFindUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserResolver,
                {
                    provide : IamFindUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindUserResolver>(IamFindUserResolver);
        handler = module.get<IamFindUserHandler>(IamFindUserHandler);
    });

    test('IamFindUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a user', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main()).toBe(users[0]);
        });
    });
});