/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUsersController } from './iam-update-users.controller';
import { IamUpdateUsersHandler } from '../handlers/iam-update-users.handler';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUsersController', () =>
{
    let controller: IamUpdateUsersController;
    let handler: IamUpdateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateUsersController,
            ],
            providers: [
                {
                    provide : IamUpdateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateUsersController>(IamUpdateUsersController);
        handler = module.get<IamUpdateUsersHandler>(IamUpdateUsersHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a users updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0])).toBe(users[0]);
        });
    });
});