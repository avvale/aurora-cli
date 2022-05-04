/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindUserByIdController } from './iam-find-user-by-id.controller';
import { IamFindUserByIdHandler } from '../handlers/iam-find-user-by-id.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamFindUserByIdController', () =>
{
    let controller: IamFindUserByIdController;
    let handler: IamFindUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindUserByIdController,
            ],
            providers: [
                {
                    provide : IamFindUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindUserByIdController>(IamFindUserByIdController);
        handler = module.get<IamFindUserByIdHandler>(IamFindUserByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindUserByIdController should be defined', () =>
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