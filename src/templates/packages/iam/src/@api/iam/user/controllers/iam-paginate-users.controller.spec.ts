/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginateUsersController } from './iam-paginate-users.controller';
import { IamPaginateUsersHandler } from '../handlers/iam-paginate-users.handler';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamPaginateUsersController', () =>
{
    let controller: IamPaginateUsersController;
    let handler: IamPaginateUsersHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateUsersController,
            ],
            providers: [
                {
                    provide : IamPaginateUsersHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<IamPaginateUsersController>(IamPaginateUsersController);
        handler = module.get<IamPaginateUsersHandler>(IamPaginateUsersHandler);
    });

    describe('main', () =>
    {
        test('IamPaginateUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : users,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : users,
            });
        });
    });
});