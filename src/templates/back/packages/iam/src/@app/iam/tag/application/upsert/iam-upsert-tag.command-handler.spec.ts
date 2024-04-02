import { iamMockTagData, IamUpsertTagCommand } from '@app/iam/tag';
import { IamUpsertTagCommandHandler } from '@app/iam/tag/application/upsert/iam-upsert-tag.command-handler';
import { IamUpsertTagService } from '@app/iam/tag/application/upsert/iam-upsert-tag.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertTagCommandHandler', () =>
{
    let commandHandler: IamUpsertTagCommandHandler;
    let service: IamUpsertTagService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertTagCommandHandler,
                {
                    provide : IamUpsertTagService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertTagCommandHandler>(IamUpsertTagCommandHandler);
        service = module.get<IamUpsertTagService>(IamUpsertTagService);
    });

    describe('main', () =>
    {
        test('UpsertTagCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertTagService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertTagCommand(
                    {
                        id: iamMockTagData[0].id,
                        name: iamMockTagData[0].name,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
