/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsPaginateMigrationsHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateMigrationsHandler', () =>
{
    let handler: ToolsPaginateMigrationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsPaginateMigrationsHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<ToolsPaginateMigrationsHandler>(ToolsPaginateMigrationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsPaginateMigrationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsPaginateMigrationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a migrations', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: toolsMockMigrationData.length,
                count: toolsMockMigrationData.length,
                rows : toolsMockMigrationData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: toolsMockMigrationData.length,
                    count: toolsMockMigrationData.length,
                    rows : toolsMockMigrationData,
                });
        });
    });
});
