/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamUpsertPermissionController } from './iam-upsert-permission.controller';
import { IamUpsertPermissionHandler } from '../handlers/iam-upsert-permission.handler';

// sources
import { permissions } from '@app/iam/permission/infrastructure/mock/mock-permission.data';

describe('IamUpsertPermissionController', () =>
{
    let controller: IamUpsertPermissionController;
    let handler: IamUpsertPermissionHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertPermissionController,
            ],
            providers: [
                {
                    provide : IamUpsertPermissionHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertPermissionController>(IamUpsertPermissionController);
        handler = module.get<IamUpsertPermissionHandler>(IamUpsertPermissionHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertPermissionController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permission upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(permissions[0])));
            expect(await controller.main(permissions[0])).toBe(permissions[0]);
        });
    });
});