/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertUserResolver } from './iam-upsert-user.resolver';
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';
import { IamUpdateUserByIdInput } from '@api/graphql';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpsertUserResolver', () =>
{
    let resolver: IamUpsertUserResolver;
    let handler: IamUpsertUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpsertUserResolver,
                {
                    provide : IamUpsertUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpsertUserResolver>(IamUpsertUserResolver);
        handler = module.get<IamUpsertUserHandler>(IamUpsertUserHandler);
    });

    test('IamUpsertUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamUpsertUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamUpdateUserByIdInput>users[0])).toBe(users[0]);
        });
    });
});