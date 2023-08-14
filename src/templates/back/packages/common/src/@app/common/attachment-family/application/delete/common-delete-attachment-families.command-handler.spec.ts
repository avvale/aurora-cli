import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAttachmentFamiliesCommandHandler } from './common-delete-attachment-families.command-handler';
import { CommonDeleteAttachmentFamiliesCommand } from './common-delete-attachment-families.command';
import { CommonDeleteAttachmentFamiliesService } from './common-delete-attachment-families.service';

describe('CommonDeleteAttachmentFamiliesCommandHandler', () =>
{
    let commandHandler: CommonDeleteAttachmentFamiliesCommandHandler;
    let service: CommonDeleteAttachmentFamiliesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAttachmentFamiliesCommandHandler,
                {
                    provide : CommonDeleteAttachmentFamiliesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAttachmentFamiliesCommandHandler>(CommonDeleteAttachmentFamiliesCommandHandler);
        service = module.get<CommonDeleteAttachmentFamiliesService>(CommonDeleteAttachmentFamiliesService);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamiliesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAttachmentFamiliesCommand(),
            )).toBe(undefined);
        });
    });
});
