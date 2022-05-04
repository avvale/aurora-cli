/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserController } from './iam-find-user.controller';
import { IamFindUserHandler } from '../handlers/iam-find-user.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserController', () =>
{
    let controller: IamFindUserController;
    let handler: IamFindUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindUserController,
            ],
            providers: [
                {
                    provide : IamFindUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindUserController>(IamFindUserController);
        handler = module.get<IamFindUserHandler>(IamFindUserHandler);
    });

    describe('main', () =>
    {
        test('IamFindUserController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a user', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main()).toBe(users[0]);
        });
    });
});