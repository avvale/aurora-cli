/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserDataByIdResolver } from './iam-find-user-data-by-id.resolver';
import { IamFindUserDataByIdHandler } from '../handlers/iam-find-user-data-by-id.handler';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserDataByIdResolver', () =>
{
    let resolver: IamFindUserDataByIdResolver;
    let handler: IamFindUserDataByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserDataByIdResolver,
                {
                    provide : IamFindUserDataByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<IamFindUserDataByIdResolver>(IamFindUserDataByIdResolver);
        handler = module.get<IamFindUserDataByIdHandler>(IamFindUserDataByIdHandler);
    });

    test('IamFindUserDataByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindUserByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(users[0].id)).toBe(users[0]);
        });
    });
});