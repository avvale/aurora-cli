import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { Delete{{ toPascalCase schema.moduleNames }}CommandHandler } from './delete-{{ toKebabCase schema.moduleNames }}.command-handler';
import { Delete{{ toPascalCase schema.moduleNames }}Command } from './delete-{{ toKebabCase schema.moduleNames }}.command';
import { Delete{{ toPascalCase schema.moduleNames }}Service } from './delete-{{ toKebabCase schema.moduleNames }}.service';

describe('Delete{{ toPascalCase schema.moduleNames }}CommandHandler', () =>
{
    let commandHandler: Delete{{ toPascalCase schema.moduleNames }}CommandHandler;
    let service: Delete{{ toPascalCase schema.moduleNames }}Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Delete{{ toPascalCase schema.moduleNames }}CommandHandler,
                {
                    provide : Delete{{ toPascalCase schema.moduleNames }}Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<Delete{{ toPascalCase schema.moduleNames }}CommandHandler>(Delete{{ toPascalCase schema.moduleNames }}CommandHandler);
        service         = module.get<Delete{{ toPascalCase schema.moduleNames }}Service>(Delete{{ toPascalCase schema.moduleNames }}Service);
    });

    describe('main', () =>
    {
        test('Delete{{ toPascalCase schema.moduleNames }}CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new Delete{{ toPascalCase schema.moduleNames }}Command(),
            )).toBe(undefined);
        });
    });
});