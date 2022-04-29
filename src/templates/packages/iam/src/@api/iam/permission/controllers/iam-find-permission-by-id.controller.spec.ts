/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamFindPermissionByIdController } from './iam-find-permission-by-id.controller';
import { IamFindPermissionByIdHandler } from '../handlers/iam-find-permission-by-id.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamFindPermissionByIdController', () =>
{
    let controller: IamFindPermissionByIdController;
    let handler: IamFindPermissionByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamFindPermissionByIdController,
            ],
            providers: [
                {
                    provide : IamFindPermissionByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindPermissionByIdController>(IamFindPermissionByIdController);
        handler = module.get<IamFindPermissionByIdHandler>(IamFindPermissionByIdHandler);
    });

    describe('main', () =>
    {
        test('IamFindPermissionByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permission by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0].id)).toBe(permissions[0]);
        });
    });
});