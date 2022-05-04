/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateUserController } from './iam-create-user.controller';
import { IamCreateUserHandler } from '../handlers/iam-create-user.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUserController', () =>
{
    let controller: IamCreateUserController;
    let handler: IamCreateUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateUserController,
            ],
            providers: [
                {
                    provide : IamCreateUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateUserController>(IamCreateUserController);
        handler = module.get<IamCreateUserHandler>(IamCreateUserHandler);
    });

    describe('main', () =>
    {
        test('IamCreateUserController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an user created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0])).toBe(users[0]);
        });
    });
});