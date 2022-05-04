/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUsersController } from './iam-delete-users.controller';
import { IamDeleteUsersHandler } from '../handlers/iam-delete-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamDeleteUsersController', () =>
{
    let controller: IamDeleteUsersController;
    let handler: IamDeleteUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteUsersController,
            ],
            providers: [
                {
                    provide : IamDeleteUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteUsersController>(IamDeleteUsersController);
        handler = module.get<IamDeleteUsersHandler>(IamDeleteUsersHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an users deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await controller.main()).toBe(users);
        });
    });
});