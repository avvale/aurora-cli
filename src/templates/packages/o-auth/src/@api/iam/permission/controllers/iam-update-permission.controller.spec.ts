/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionController } from './iam-update-permission.controller';
import { IamUpdatePermissionHandler } from '../handlers/iam-update-permission.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionController', () =>
{
    let controller: IamUpdatePermissionController;
    let handler: IamUpdatePermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdatePermissionController,
            ],
            providers: [
                {
                    provide : IamUpdatePermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdatePermissionController>(IamUpdatePermissionController);
        handler = module.get<IamUpdatePermissionHandler>(IamUpdatePermissionHandler);
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permission created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0])).toBe(permissions[0]);
        });
    });
});