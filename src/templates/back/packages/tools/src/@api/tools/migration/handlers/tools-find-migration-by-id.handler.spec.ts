/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindMigrationByIdHandler } from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindMigrationByIdHandler', () => {
    let handler: ToolsFindMigrationByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindMigrationByIdHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<ToolsFindMigrationByIdHandler>(
            ToolsFindMigrationByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindMigrationByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindMigrationByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an migration by id', async () => {
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
