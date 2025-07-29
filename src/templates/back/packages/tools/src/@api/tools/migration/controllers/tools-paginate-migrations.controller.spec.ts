import { ToolsPaginateMigrationsController, ToolsPaginateMigrationsHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateMigrationsController', () =>
{
    let controller: ToolsPaginateMigrationsController;
    let handler: ToolsPaginateMigrationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsPaginateMigrationsController,
            ],
            providers: [
                {
                    provide : ToolsPaginateMigrationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsPaginateMigrationsController>(ToolsPaginateMigrationsController);
        handler = module.get<ToolsPaginateMigrationsHandler>(ToolsPaginateMigrationsHandler);
    });

    describe('main', () =>
    {
        test('ToolsPaginateMigrationsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockMigrationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : toolsMockMigrationData,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : toolsMockMigrationData,
            });
        });
    });
});
