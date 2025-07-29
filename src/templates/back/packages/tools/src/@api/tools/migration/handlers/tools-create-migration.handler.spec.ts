/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateMigrationHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationHandler', () =>
{
    let handler: ToolsCreateMigrationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsCreateMigrationHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsCreateMigrationHandler>(ToolsCreateMigrationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('ToolsCreateMigrationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an migration created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockMigrationData[0])));
            expect(
                await handler.main(
                    toolsMockMigrationData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockMigrationData[0]);
        });
    });
});
