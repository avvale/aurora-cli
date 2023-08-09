import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonUpdateResourcesCommandHandler } from './common-update-resources.command-handler';
import { CommonUpdateResourcesCommand } from './common-update-resources.command';
import { CommonUpdateResourcesService } from './common-update-resources.service';

describe('CommonUpdateResourcesCommandHandler', () =>
{
    let commandHandler: CommonUpdateResourcesCommandHandler;
    let service: CommonUpdateResourcesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateResourcesCommandHandler,
                {
                    provide : CommonUpdateResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateResourcesCommandHandler>(CommonUpdateResourcesCommandHandler);
        service = module.get<CommonUpdateResourcesService>(CommonUpdateResourcesService);
    });

    describe('main', () =>
    {
        test('UpdateResourcesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an resources updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateResourcesCommand(
                    {
                        id: commonMockResourceData[0].id,
                        code: commonMockResourceData[0].code,
                        name: commonMockResourceData[0].name,
                        isActive: commonMockResourceData[0].isActive,
                        hasAttachments: commonMockResourceData[0].hasAttachments,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
