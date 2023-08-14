import { IamUpsertRoleController, IamUpsertRoleHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertRoleController', () =>
{
    let controller: IamUpsertRoleController;
    let handler: IamUpsertRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamUpsertRoleController,
            ],
            providers: [
                {
                    provide : IamUpsertRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamUpsertRoleController>(IamUpsertRoleController);
        handler = module.get<IamUpsertRoleHandler>(IamUpsertRoleHandler);
    });

    describe('main', () =>
    {
        test('IamUpsertRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an role upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData[0])));
            expect(await controller.main(iamMockRoleData[0])).toBe(iamMockRoleData[0]);
        });
    });
});
