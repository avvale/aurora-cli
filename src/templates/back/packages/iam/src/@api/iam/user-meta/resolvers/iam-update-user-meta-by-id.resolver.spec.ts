/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserMetaByIdResolver } from './iam-update-user-meta-by-id.resolver';
import { IamUpdateUserMetaByIdHandler } from '../handlers/iam-update-user-meta-by-id.handler';
import { IamUpdateUserMetaByIdInput } from '@api/graphql';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpdateUserByIdResolver', () =>
{
    let resolver: IamUpdateUserMetaByIdResolver;
    let handler: IamUpdateUserMetaByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamUpdateUserMetaByIdResolver,
                {
                    provide : IamUpdateUserMetaByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamUpdateUserMetaByIdResolver>(IamUpdateUserMetaByIdResolver);
        handler = module.get<IamUpdateUserMetaByIdHandler>(IamUpdateUserMetaByIdHandler);
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
            expect(await resolver.main(<IamUpdateUserMetaByIdInput>users[0], {})).toBe(users[0]);
        });
    });
});