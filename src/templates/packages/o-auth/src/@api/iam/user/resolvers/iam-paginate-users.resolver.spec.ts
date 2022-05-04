/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateUsersResolver } from './iam-paginate-users.resolver';
import { IamPaginateUsersHandler } from '../handlers/iam-paginate-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamPaginateUsersResolver', () =>
{
    let resolver: IamPaginateUsersResolver;
    let handler: IamPaginateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateUsersResolver,
                {
                    provide : IamPaginateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver    = module.get<IamPaginateUsersResolver>(IamPaginateUsersResolver);
        handler = module.get<IamPaginateUsersHandler>(IamPaginateUsersHandler);
    });

    test('IamPaginateUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : users,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : users,
            });
        });
    });
});