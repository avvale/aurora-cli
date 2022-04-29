/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserController } from './iam-update-user.controller';
import { IamUpdateUserHandler } from '../handlers/iam-update-user.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUserController', () =>
{
    let controller: IamUpdateUserController;
    let handler: IamUpdateUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateUserController,
            ],
            providers: [
                {
                    provide : IamUpdateUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateUserController>(IamUpdateUserController);
        handler = module.get<IamUpdateUserHandler>(IamUpdateUserHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateUserController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a user created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0])).toBe(users[0]);
        });
    });
});