import { IamUpsertPermissionController, IamUpsertPermissionHandler } from '@api/iam/permission';
import { iamMockPermissionData } from '@app/iam/permission';
import { Test, TestingModule } from '@nestjs/testing';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockPermissionData[0])));
            expect(await controller.main(iamMockPermissionData[0])).toBe(iamMockPermissionData[0]);
        });
    });
});
