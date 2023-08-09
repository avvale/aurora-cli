/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonCreateResourcesCommandHandler } from './common-create-resources.command-handler';
import { CommonCreateResourcesCommand } from './common-create-resources.command';
import { CommonCreateResourcesService } from './common-create-resources.service';

describe('commonCreateResourcesCommandHandler', () =>
{
    let commandHandler: CommonCreateResourcesCommandHandler;
    let service: CommonCreateResourcesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateResourcesCommandHandler,
                {
                    provide : CommonCreateResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateResourcesCommandHandler>(CommonCreateResourcesCommandHandler);
        service = module.get<CommonCreateResourcesService>(CommonCreateResourcesService);
    });

    describe('main', () =>
    {
        test('CommonCreateResourcesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return CommonMockResourceData createds', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateResourcesCommand(
                    commonMockResourceData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
