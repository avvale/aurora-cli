/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateUserResolver } from './iam-create-user.resolver';
import { IamCreateUserHandler } from '../handlers/iam-create-user.handler';
import { IamCreateUserInput } from '../../../../graphql';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUserResolver', () =>
{
    let resolver: IamCreateUserResolver;
    let handler: IamCreateUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateUserResolver,
                {
                    provide : IamCreateUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateUserResolver>(IamCreateUserResolver);
        handler = module.get<IamCreateUserHandler>(IamCreateUserHandler);
    });

    test('IamCreateUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamCreateUserInput>users[0])).toBe(users[0]);
        });
    });
});