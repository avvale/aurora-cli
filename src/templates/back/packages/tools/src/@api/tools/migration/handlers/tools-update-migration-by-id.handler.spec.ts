/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateMigrationByIdInput } from '@api/graphql';
import { ToolsUpdateMigrationByIdHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationByIdHandler', () => {
    let handler: ToolsUpdateMigrationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateMigrationByIdHandler,
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

        handler = module.get<ToolsUpdateMigrationByIdHandler>(
            ToolsUpdateMigrationByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsUpdateMigrationByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateMigrationByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a migration updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <ToolsUpdateMigrationByIdInput>toolsMockMigrationData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(toolsMockMigrationData[0]);
        });
    });
});
