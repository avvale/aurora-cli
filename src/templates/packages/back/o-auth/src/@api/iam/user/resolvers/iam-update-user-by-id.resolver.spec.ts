/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserByIdResolver } from './iam-update-user-by-id.resolver';
import { IamUpdateUserByIdHandler } from '../handlers/iam-update-user-by-id.handler';
import { IamUpdateUserByIdInput } from '../../../../graphql';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUserByIdResolver', () =>
{
    let resolver: IamUpdateUserByIdResolver;
    let handler: IamUpdateUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserByIdResolver,
                {
                    provide : IamUpdateUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateUserByIdResolver>(IamUpdateUserByIdResolver);
        handler = module.get<IamUpdateUserByIdHandler>(IamUpdateUserByIdHandler);
    });

    test('IamUpdateUserByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a user by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamUpdateUserByIdInput>users[0])).toBe(users[0]);
        });
    });
});