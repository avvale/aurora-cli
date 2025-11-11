/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateMigrationsInput } from '@api/graphql';
import { ToolsUpdateMigrationsHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationsHandler', () => {
    let handler: ToolsUpdateMigrationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateMigrationsHandler,
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

        handler = module.get<ToolsUpdateMigrationsHandler>(
            ToolsUpdateMigrationsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsUpdateMigrationsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateMigrationsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a migrations updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <ToolsUpdateMigrationsInput>toolsMockMigrationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(toolsMockMigrationData[0]);
        });
    });
});
