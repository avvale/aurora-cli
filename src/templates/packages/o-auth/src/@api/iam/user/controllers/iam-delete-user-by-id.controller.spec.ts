/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteUserByIdController } from './iam-delete-user-by-id.controller';
import { IamDeleteUserByIdHandler } from '../handlers/iam-delete-user-by-id.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamDeleteUserByIdController', () =>
{
    let controller: IamDeleteUserByIdController;
    let handler: IamDeleteUserByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteUserByIdController,
            ],
            providers: [
                {
                    provide : IamDeleteUserByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeleteUserByIdController>(IamDeleteUserByIdController);
        handler = module.get<IamDeleteUserByIdHandler>(IamDeleteUserByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeleteUserByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an user deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await controller.main(users[0].id)).toBe(users[0]);
        });
    });
});