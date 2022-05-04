/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserResolver } from './iam-update-user.resolver';
import { IamUpdateUserHandler } from '../handlers/iam-update-user.handler';
import { IamUpdateUserInput } from '../../../../graphql';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUserResolver', () =>
{
    let resolver: IamUpdateUserResolver;
    let handler: IamUpdateUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserResolver,
                {
                    provide : IamUpdateUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamUpdateUserResolver>(IamUpdateUserResolver);
        handler = module.get<IamUpdateUserHandler>(IamUpdateUserHandler);
    });

    test('IamUpdateUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a user created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamUpdateUserInput>users[0])).toBe(users[0]);
        });
    });
});