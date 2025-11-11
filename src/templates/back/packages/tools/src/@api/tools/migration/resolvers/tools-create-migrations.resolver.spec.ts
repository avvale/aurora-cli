import { ToolsCreateMigrationInput } from '@api/graphql';
import {
    ToolsCreateMigrationsHandler,
    ToolsCreateMigrationsResolver,
} from '@api/tools/migration';
import { toolsMockMigrationData } from '@app/tools/migration';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateMigrationsResolver', () => {
    let resolver: ToolsCreateMigrationsResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateMigrationsResolver,
                {
                    provide: ToolsCreateMigrationsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsCreateMigrationsResolver>(
            ToolsCreateMigrationsResolver,
        );
    });

    test('ToolsCreateMigrationsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCreateMigrationsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an migrations created', async () => {
            expect(
                await resolver.main(
                    <ToolsCreateMigrationInput[]>toolsMockMigrationData,
                ),
            ).toBe(undefined);
        });
    });
});
