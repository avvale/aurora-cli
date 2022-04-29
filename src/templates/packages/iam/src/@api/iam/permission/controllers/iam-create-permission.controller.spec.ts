/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreatePermissionController } from './iam-create-permission.controller';
import { IamCreatePermissionHandler } from '../handlers/iam-create-permission.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamCreatePermissionController', () =>
{
    let controller: IamCreatePermissionController;
    let handler: IamCreatePermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreatePermissionController,
            ],
            providers: [
                {
                    provide : IamCreatePermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreatePermissionController>(IamCreatePermissionController);
        handler = module.get<IamCreatePermissionHandler>(IamCreatePermissionHandler);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permission created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0])).toBe(permissions[0]);
        });
    });
});