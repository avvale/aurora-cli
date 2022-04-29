/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUsersResolver } from './iam-delete-users.resolver';
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamDeleteUsersResolver', () =>
{
    let resolver: IamDeleteUsersResolver;
    let handler: IamDeleteUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteUsersResolver,
                {
                    provide : IamDeleteUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteUsersResolver>(IamDeleteUsersResolver);
        handler = module.get<IamDeleteUsersHandler>(IamDeleteUsersHandler);
    });

    test('IamDeleteUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an users deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await resolver.main()).toBe(users);
        });
    });
});