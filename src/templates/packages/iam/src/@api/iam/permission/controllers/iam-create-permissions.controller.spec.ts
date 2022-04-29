import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreatePermissionsController } from './iam-create-permissions.controller';
import { IamCreatePermissionsHandler } from '../handlers/iam-create-permissions.handler';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamCreatePermissionsController', () =>
{
    let controller: IamCreatePermissionsController;
    let handler: IamCreatePermissionsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreatePermissionsController,
            ],
            providers: [
                {
                    provide : IamCreatePermissionsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreatePermissionsController>(IamCreatePermissionsController);
        handler = module.get<IamCreatePermissionsHandler>(IamCreatePermissionsHandler);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permissions created', async () =>
        {
            expect(await controller.main(permissions)).toBe(undefined);
        });
    });
});