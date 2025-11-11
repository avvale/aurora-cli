/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsPaginateMigrationsHandler,
    ToolsPaginateMigrationsResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateMigrationsResolver', () => {
    let resolver: ToolsPaginateMigrationsResolver;
    let handler: ToolsPaginateMigrationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsPaginateMigrationsResolver,
                {
                    provide: ToolsPaginateMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsPaginateMigrationsResolver>(
            ToolsPaginateMigrationsResolver,
        );
        handler = module.get<ToolsPaginateMigrationsHandler>(
            ToolsPaginateMigrationsHandler,
        );
    });

    test('ToolsPaginateMigrationsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsPaginateMigrationsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a toolsMockMigrationData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: toolsMockMigrationData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: toolsMockMigrationData,
            });
        });
    });
});
