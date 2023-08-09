import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonUpdateResourceByIdCommandHandler } from './common-update-resource-by-id.command-handler';
import { CommonUpdateResourceByIdCommand } from './common-update-resource-by-id.command';
import { CommonUpdateResourceByIdService } from './common-update-resource-by-id.service';

describe('CommonUpdateResourceByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateResourceByIdCommandHandler;
    let service: CommonUpdateResourceByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateResourceByIdCommandHandler,
                {
                    provide : CommonUpdateResourceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateResourceByIdCommandHandler>(CommonUpdateResourceByIdCommandHandler);
        service = module.get<CommonUpdateResourceByIdService>(CommonUpdateResourceByIdService);
    });

    describe('main', () =>
    {
        test('UpdateResourceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an resource created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateResourceByIdCommand(
                    {
                        id: commonMockResourceData[0].id,
                        code: commonMockResourceData[0].code,
                        name: commonMockResourceData[0].name,
                        isActive: commonMockResourceData[0].isActive,
                        hasAttachments: commonMockResourceData[0].hasAttachments,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
