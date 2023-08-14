import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAttachmentFamilyByIdCommandHandler } from './common-delete-attachment-family-by-id.command-handler';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family/infrastructure/mock/common-mock-attachment-family.data';
import { CommonDeleteAttachmentFamilyByIdCommand } from './common-delete-attachment-family-by-id.command';
import { CommonDeleteAttachmentFamilyByIdService } from './common-delete-attachment-family-by-id.service';

describe('CommonDeleteAttachmentFamilyByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteAttachmentFamilyByIdCommandHandler;
    let service: CommonDeleteAttachmentFamilyByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteAttachmentFamilyByIdCommandHandler,
                {
                    provide : CommonDeleteAttachmentFamilyByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteAttachmentFamilyByIdCommandHandler>(CommonDeleteAttachmentFamilyByIdCommandHandler);
        service = module.get<CommonDeleteAttachmentFamilyByIdService>(CommonDeleteAttachmentFamilyByIdService);
    });

    describe('main', () =>
    {
        test('CommonDeleteAttachmentFamilyByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteAttachmentFamilyByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteAttachmentFamilyByIdCommand(
                    commonMockAttachmentFamilyData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
