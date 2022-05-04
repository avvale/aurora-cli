/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindPermissionController } from './iam-find-permission.controller';
import { IamFindPermissionHandler } from '../handlers/iam-find-permission.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamFindPermissionController', () =>
{
    let controller: IamFindPermissionController;
    let handler: IamFindPermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindPermissionController,
            ],
            providers: [
                {
                    provide : IamFindPermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindPermissionController>(IamFindPermissionController);
        handler = module.get<IamFindPermissionHandler>(IamFindPermissionHandler);
    });

    describe('main', () =>
    {
        test('IamFindPermissionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permission', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main()).toBe(permissions[0]);
        });
    });
});