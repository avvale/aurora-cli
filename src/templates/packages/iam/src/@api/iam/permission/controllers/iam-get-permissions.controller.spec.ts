/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamGetPermissionsController } from './iam-get-permissions.controller';
import { IamGetPermissionsHandler } from '../handlers/iam-get-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamGetPermissionsController', () =>
{
    let controller: IamGetPermissionsController;
    let handler: IamGetPermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamGetPermissionsController,
            ],
            providers: [
                {
                    provide : IamGetPermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamGetPermissionsController>(IamGetPermissionsController);
        handler = module.get<IamGetPermissionsHandler>(IamGetPermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamGetPermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a permissions', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await controller.main()).toBe(permissions);
        });
    });
});