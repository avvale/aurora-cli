import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangByIdCommandHandler } from './common-delete-lang-by-id.command-handler';
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';
import { CommonDeleteLangByIdCommand } from './common-delete-lang-by-id.command';
import { CommonDeleteLangByIdService } from './common-delete-lang-by-id.service';

describe('CommonDeleteLangByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteLangByIdCommandHandler;
    let service: CommonDeleteLangByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteLangByIdCommandHandler,
                {
                    provide : CommonDeleteLangByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteLangByIdCommandHandler>(CommonDeleteLangByIdCommandHandler);
        service = module.get<CommonDeleteLangByIdService>(CommonDeleteLangByIdService);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteLangByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteLangByIdCommand(
                    commonMockLangData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});