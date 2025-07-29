/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteMigrationByIdController, ToolsDeleteMigrationByIdHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationByIdController', () =>
{
    let controller: ToolsDeleteMigrationByIdController;
    let handler: ToolsDeleteMigrationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                ToolsDeleteMigrationByIdController,
            ],
            providers: [
                {
                    provide : ToolsDeleteMigrationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<ToolsDeleteMigrationByIdController>(ToolsDeleteMigrationByIdController);
        handler = module.get<ToolsDeleteMigrationByIdHandler>(ToolsDeleteMigrationByIdHandler);
    });

    describe('main', () =>
    {
        test('ToolsDeleteMigrationByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an migration deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(toolsMockMigrationData[0])));
            expect(await controller.main(toolsMockMigrationData[0].id)).toBe(toolsMockMigrationData[0]);
        });
    });
});
