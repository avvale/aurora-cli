/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionsController } from './iam-delete-permissions.controller';
import { IamDeletePermissionsHandler } from '../handlers/iam-delete-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamDeletePermissionsController', () =>
{
    let controller: IamDeletePermissionsController;
    let handler: IamDeletePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeletePermissionsController,
            ],
            providers: [
                {
                    provide : IamDeletePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeletePermissionsController>(IamDeletePermissionsController);
        handler = module.get<IamDeletePermissionsHandler>(IamDeletePermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permissions deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await controller.main()).toBe(permissions);
        });
    });
});