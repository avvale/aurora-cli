/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetUsersResolver } from './iam-get-users.resolver';
import { IamGetUsersHandler } from '../handlers/iam-get-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamGetUsersResolver', () =>
{
    let resolver: IamGetUsersResolver;
    let handler: IamGetUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetUsersResolver,
                {
                    provide : IamGetUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamGetUsersResolver>(IamGetUsersResolver);
        handler = module.get<IamGetUsersHandler>(IamGetUsersHandler);
    });

    test('IamGetUsersResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetUsersResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await resolver.main()).toBe(users);
        });
    });
});