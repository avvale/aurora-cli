/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetUsersController } from './iam-get-users.controller';
import { IamGetUsersHandler } from '../handlers/iam-get-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamGetUsersController', () =>
{
    let controller: IamGetUsersController;
    let handler: IamGetUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetUsersController,
            ],
            providers: [
                {
                    provide : IamGetUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetUsersController>(IamGetUsersController);
        handler = module.get<IamGetUsersHandler>(IamGetUsersHandler);
    });

    describe('main', () =>
    {
        test('IamGetUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await controller.main()).toBe(users);
        });
    });
});