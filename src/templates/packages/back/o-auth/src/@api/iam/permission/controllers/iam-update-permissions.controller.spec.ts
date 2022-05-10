/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionsController } from './iam-update-permissions.controller';
import { IamUpdatePermissionsHandler } from '../handlers/iam-update-permissions.handler';

// sources
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionsController', () =>
{
    let controller: IamUpdatePermissionsController;
    let handler: IamUpdatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdatePermissionsController,
            ],
            providers: [
                {
                    provide : IamUpdatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdatePermissionsController>(IamUpdatePermissionsController);
        handler = module.get<IamUpdatePermissionsHandler>(IamUpdatePermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permissions updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0])).toBe(permissions[0]);
        });
    });
});