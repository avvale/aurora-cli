import {
    ToolsGetMigrationsController,
    ToolsGetMigrationsHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetMigrationsController', () => {
    let controller: ToolsGetMigrationsController;
    let handler: ToolsGetMigrationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsGetMigrationsController],
            providers: [
                {
                    provide: ToolsGetMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsGetMigrationsController>(
            ToolsGetMigrationsController,
        );
        handler = module.get<ToolsGetMigrationsHandler>(
            ToolsGetMigrationsHandler,
        );
    });

    describe('main', () => {
        test('ToolsGetMigrationsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockMigrationData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockMigrationData)),
            );
            expect(await controller.main()).toBe(toolsMockMigrationData);
        });
    });
});
