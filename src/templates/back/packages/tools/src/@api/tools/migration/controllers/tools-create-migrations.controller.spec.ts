import {
    ToolsCreateMigrationsController,
    ToolsCreateMigrationsHandler,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationsController', () => {
    let controller: ToolsCreateMigrationsController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ToolsCreateMigrationsController],
            providers: [
                {
                    provide: ToolsCreateMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsCreateMigrationsController>(
            ToolsCreateMigrationsController,
        );
    });

    describe('main', () => {
        test('ToolsCreateMigrationsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockMigrationData created', async () => {
            expect(await controller.main(toolsMockMigrationData)).toBe(
                undefined,
            );
        });
    });
});
