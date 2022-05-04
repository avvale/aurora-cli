/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserByIdResolver } from './iam-find-user-by-id.resolver';
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserByIdResolver', () =>
{
    let resolver: IamFindUserByIdResolver;
    let handler: IamFindUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindUserByIdResolver,
                {
                    provide : IamFindUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamFindUserByIdResolver>(IamFindUserByIdResolver);
        handler = module.get<IamFindUserByIdHandler>(IamFindUserByIdHandler);
    });

    test('IamFindUserByIdResolver should be defined', () =>
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