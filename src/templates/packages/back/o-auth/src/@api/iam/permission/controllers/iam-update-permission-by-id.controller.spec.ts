/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpdatePermissionByIdController } from './iam-update-permission-by-id.controller';
import { IamUpdatePermissionByIdHandler } from '../handlers/iam-update-permission-by-id.handler';

// sources
import { permissions } from '@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamUpdatePermissionByIdController', () =>
{
    let controller: IamUpdatePermissionByIdController;
    let handler: IamUpdatePermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpdatePermissionByIdController,
            ],
            providers: [
                {
                    provide : IamUpdatePermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpdatePermissionByIdController>(IamUpdatePermissionByIdController);
        handler = module.get<IamUpdatePermissionByIdHandler>(IamUpdatePermissionByIdHandler);
    });

    describe('main', () =>
    {
        test('IamUpdatePermissionByIdController should be defined', () =>
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