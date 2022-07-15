/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserDataByIdResolver } from './iam-update-user-data-by-id.resolver';
import { IamUpdateUserDataByIdHandler } from '../handlers/iam-update-user-data-by-id.handler';
import { IamUpdateUserByIdInput } from '../../../../graphql';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUserByIdResolver', () =>
{
    let resolver: IamUpdateUserDataByIdResolver;
    let handler: IamUpdateUserDataByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserDataByIdResolver,
                {
                    provide : IamUpdateUserDataByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateUserDataByIdResolver>(IamUpdateUserDataByIdResolver);
        handler = module.get<IamUpdateUserDataByIdHandler>(IamUpdateUserDataByIdHandler);
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