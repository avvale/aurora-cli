import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangByIdCommandHandler } from './common-delete-lang-by-id.command-handler';
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { CommonDeleteLangByIdCommand } from './common-delete-lang-by-id.command';
import { CommonDeleteLangByIdService } from './common-delete-lang-by-id.service';

describe('CommonDeleteLangByIdCommandHandler', () =>
{
    let commandHandler: DeleteLangByIdCommandHandler;
    let service: DeleteLangByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteLangByIdCommandHandler,
                {
                    provide : DeleteLangByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<DeleteLangByIdCommandHandler>(DeleteLangByIdCommandHandler);
        service = module.get<DeleteLangByIdService>(DeleteLangByIdService);
    });

    describe('main', () =>
    {
        test('DeleteLangByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteLangByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteLangByIdCommand(
                    langs[0].id,
                ),
            )).toBe(undefined);
        });
    });
});