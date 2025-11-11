import {
    ToolsUpdateMigrationsController,
    ToolsUpdateMigrationsHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationsController', () => {
    let controller: ToolsUpdateMigrationsController;
    let handler: ToolsUpdateMigrationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsUpdateMigrationsController],
            providers: [
                {
                    provide: ToolsUpdateMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsUpdateMigrationsController>(
            ToolsUpdateMigrationsController,
        );
        handler = module.get<ToolsUpdateMigrationsHandler>(
            ToolsUpdateMigrationsHandler,
        );
    });

    describe('main', () => {
        test('ToolsUpdateMigrationsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a migrations updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(await controller.main(toolsMockMigrationData[0])).toBe(
                toolsMockMigrationData[0],
            );
        });
    });
});
