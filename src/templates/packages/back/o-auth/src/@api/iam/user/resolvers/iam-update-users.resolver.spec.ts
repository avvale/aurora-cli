/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUsersResolver } from './iam-update-users.resolver';
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';
import { IamUpdateUsersInput } from '../../../../graphql';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUsersResolver', () =>
{
    let resolver: IamUpdateUsersResolver;
    let handler: IamUpdateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUsersResolver,
                {
                    provide : IamUpdateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateUsersResolver>(IamUpdateUsersResolver);
        handler = module.get<IamUpdateUsersHandler>(IamUpdateUsersHandler);
    });

    test('IamUpdateUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a users updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamUpdateUsersInput>users[0])).toBe(users[0]);
        });
    });
});