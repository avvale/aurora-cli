import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonUpsertResourceCommandHandler } from './common-upsert-resource.command-handler';
import { CommonUpsertResourceCommand } from './common-upsert-resource.command';
import { CommonUpsertResourceService } from './common-upsert-resource.service';

describe('CommonUpsertResourceCommandHandler', () =>
{
    let commandHandler: CommonUpsertResourceCommandHandler;
    let service: CommonUpsertResourceService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpsertResourceCommandHandler,
                {
                    provide : CommonUpsertResourceService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpsertResourceCommandHandler>(CommonUpsertResourceCommandHandler);
        service = module.get<CommonUpsertResourceService>(CommonUpsertResourceService);
    });

    describe('main', () =>
    {
        test('UpsertResourceCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the CommonUpsertResourceService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpsertResourceCommand(
                    {
                        id: commonMockResourceData[0].id,
                        code: commonMockResourceData[0].code,
                        name: commonMockResourceData[0].name,
                        isActive: commonMockResourceData[0].isActive,
                        hasAttachments: commonMockResourceData[0].hasAttachments,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
