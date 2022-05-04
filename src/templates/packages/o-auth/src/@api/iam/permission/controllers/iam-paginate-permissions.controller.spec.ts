/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamPaginatePermissionsController } from './iam-paginate-permissions.controller';
import { IamPaginatePermissionsHandler } from '../handlers/iam-paginate-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamPaginatePermissionsController', () =>
{
    let controller: IamPaginatePermissionsController;
    let handler: IamPaginatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginatePermissionsController,
            ],
            providers: [
                {
                    provide : IamPaginatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ]
        }).compile();

        controller = module.get<IamPaginatePermissionsController>(IamPaginatePermissionsController);
        handler = module.get<IamPaginatePermissionsHandler>(IamPaginatePermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamPaginatePermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permissions', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : permissions,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : permissions,
            });
        });
    });
});