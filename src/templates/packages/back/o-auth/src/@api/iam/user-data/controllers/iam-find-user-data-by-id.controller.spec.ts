/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserDataByIdController } from './iam-find-user-data-by-id.controller';
import { IamFindUserDataByIdHandler } from '../handlers/iam-find-user-data-by-id.handler';

// sources
import { users } from '@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserDataByIdController', () =>
{
    let controller: IamFindUserDataByIdController;
    let handler: IamFindUserDataByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindUserDataByIdController,
            ],
            providers: [
                {
                    provide : IamFindUserDataByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamFindUserDataByIdController>(IamFindUserDataByIdController);
        handler = module.get<IamFindUserDataByIdHandler>(IamFindUserDataByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindUserDataByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an user by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0].id)).toBe(users[0]);
        });
    });
});