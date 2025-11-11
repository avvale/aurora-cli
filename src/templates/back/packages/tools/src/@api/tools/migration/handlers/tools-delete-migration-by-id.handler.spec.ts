/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteMigrationByIdHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationByIdController', () => {
    let handler: ToolsDeleteMigrationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteMigrationByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<ToolsDeleteMigrationByIdHandler>(
            ToolsDeleteMigrationByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('ToolsDeleteMigrationByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an migration deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(
                await handler.main(
                    toolsMockMigrationData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(toolsMockMigrationData[0]);
        });
    });
});
