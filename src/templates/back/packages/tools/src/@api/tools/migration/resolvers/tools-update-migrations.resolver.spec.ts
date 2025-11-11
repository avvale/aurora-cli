/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateMigrationsInput } from '@api/graphql';
import {
    ToolsUpdateMigrationsHandler,
    ToolsUpdateMigrationsResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateMigrationsResolver', () => {
    let resolver: ToolsUpdateMigrationsResolver;
    let handler: ToolsUpdateMigrationsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateMigrationsResolver,
                {
                    provide: ToolsUpdateMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsUpdateMigrationsResolver>(
            ToolsUpdateMigrationsResolver,
        );
        handler = module.get<ToolsUpdateMigrationsHandler>(
            ToolsUpdateMigrationsHandler,
        );
    });

    test('ToolsUpdateMigrationsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateMigrationsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a migrations updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockMigrationData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <ToolsUpdateMigrationsInput>toolsMockMigrationData[0],
                ),
            ).toBe(toolsMockMigrationData[0]);
        });
    });
});
