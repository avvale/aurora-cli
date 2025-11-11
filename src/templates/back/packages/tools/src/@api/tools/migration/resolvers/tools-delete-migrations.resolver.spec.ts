/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteMigrationsHandler,
    ToolsDeleteMigrationsResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteMigrationsResolver', () => {
    let resolver: ToolsDeleteMigrationsResolver;
    let handler: ToolsDeleteMigrationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteMigrationsResolver,
                {
                    provide: ToolsDeleteMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsDeleteMigrationsResolver>(
            ToolsDeleteMigrationsResolver,
        );
        handler = module.get<ToolsDeleteMigrationsHandler>(
            ToolsDeleteMigrationsHandler,
        );
    });

    test('ToolsDeleteMigrationsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteMigrationsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an toolsMockMigrationData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockMigrationData)),
            );
            expect(await resolver.main()).toBe(toolsMockMigrationData);
        });
    });
});
