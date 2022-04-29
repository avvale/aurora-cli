/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeletePermissionByIdController } from './iam-delete-permission-by-id.controller';
import { IamDeletePermissionByIdHandler } from '../handlers/iam-delete-permission-by-id.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamDeletePermissionByIdController', () =>
{
    let controller: IamDeletePermissionByIdController;
    let handler: IamDeletePermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeletePermissionByIdController,
            ],
            providers: [
                {
                    provide : IamDeletePermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamDeletePermissionByIdController>(IamDeletePermissionByIdController);
        handler = module.get<IamDeletePermissionByIdHandler>(IamDeletePermissionByIdHandler);
    });

    describe('main', () =>
    {
        test('IamDeletePermissionByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permission deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0].id)).toBe(permissions[0]);
        });
    });
});