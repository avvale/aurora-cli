import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateUsersResolver } from './iam-create-users.resolver';
import { IamCreateUsersHandler } from '../handlers/iam-create-users.handler';
import { IamCreateUserInput } from '../../../../graphql';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUsersResolver', () =>
{
    let resolver: IamCreateUsersResolver;
    let handler: IamCreateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateUsersResolver,
                {
                    provide : IamCreateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateUsersResolver>(IamCreateUsersResolver);
        handler = module.get<IamCreateUsersHandler>(IamCreateUsersHandler);
    });

    test('IamCreateUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an users created', async () =>
        {
            expect(await resolver.main(<IamCreateUserInput[]>users)).toBe(undefined);
        });
    });
});