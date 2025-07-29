import { ToolsFindMigrationController, ToolsFindMigrationHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationController', () =>
{
    let controller: ToolsFindMigrationController;
    let handler: ToolsFindMigrationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsFindMigrationController,
            ],
            providers: [
                {
                    provide : ToolsFindMigrationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsFindMigrationController>(ToolsFindMigrationController);
        handler = module.get<ToolsFindMigrationHandler>(ToolsFindMigrationHandler);
    });

    describe('main', () =>
    {
        test('ToolsFindMigrationController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a migration', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockMigrationData[0])));
            expect(await controller.main()).toBe(toolsMockMigrationData[0]);
        });
    });
});
