import { CommonDeleteAttachmentFamilyByIdCommand, commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { CommonDeleteAttachmentFamilyByIdCommandHandler } from '@app/common/attachment-family/application/delete/common-delete-attachment-family-by-id.command-handler';
import { CommonDeleteAttachmentFamilyByIdService } from '@app/common/attachment-family/application/delete/common-delete-attachment-family-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamilyByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteAttachmentFamilyByIdCommandHandler;

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
