/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdateUserByIdController } from './iam-update-user-by-id.controller';
import { IamUpdateUserByIdHandler } from '../handlers/iam-update-user-by-id.handler';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpdateUserByIdController', () =>
{
    let controller: IamUpdateUserByIdController;
    let handler: IamUpdateUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdateUserByIdController,
            ],
            providers: [
                {
                    provide : IamUpdateUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdateUserByIdController>(IamUpdateUserByIdController);
        handler = module.get<IamUpdateUserByIdHandler>(IamUpdateUserByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdateUserByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a user updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0])).toBe(users[0]);
        });
    });
});