/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertUserController } from './iam-upsert-user.controller';
import { IamUpsertUserHandler } from '../handlers/iam-upsert-user.handler';

// sources
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

describe('IamUpsertUserController', () =>
{
    let controller: IamUpsertUserController;
    let handler: IamUpsertUserHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertUserController,
            ],
            providers: [
                {
                    provide : IamUpsertUserHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertUserController>(IamUpsertUserController);
        handler = module.get<IamUpsertUserHandler>(IamUpsertUserHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertUserController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an user upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0])).toBe(users[0]);
        });
    });
});