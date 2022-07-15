/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserDataByIdController } from './iam-update-user-data-by-id.controller';
import { IamUpdateUserDataByIdHandler } from '../handlers/iam-update-user-data-by-id.handler';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamUpdateUserByIdController', () =>
{
    let controller: IamUpdateUserDataByIdController;
    let handler: IamUpdateUserDataByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateUserDataByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateUserDataByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateUserDataByIdController>(IamUpdateUserDataByIdController);
        handler = module.get<IamUpdateUserDataByIdHandler>(IamUpdateUserDataByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdController should be defined', () =>
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