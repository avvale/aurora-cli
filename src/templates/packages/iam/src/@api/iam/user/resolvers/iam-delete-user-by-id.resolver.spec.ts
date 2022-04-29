/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUserByIdResolver } from './iam-delete-user-by-id.resolver';
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamDeleteUserByIdResolver', () =>
{
    let resolver: IamDeleteUserByIdResolver;
    let handler: IamDeleteUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeleteUserByIdResolver,
                {
                    provide : IamDeleteUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamDeleteUserByIdResolver>(IamDeleteUserByIdResolver);
        handler = module.get<IamDeleteUserByIdHandler>(IamDeleteUserByIdHandler);
    });

    test('IamDeleteUserByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeleteUserByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(users[0].id)).toBe(users[0]);
        });
    });
});