import { CommonDeleteResourcesCommand } from '@app/common/resource';
import { CommonDeleteResourcesCommandHandler } from '@app/common/resource/application/delete/common-delete-resources.command-handler';
import { CommonDeleteResourcesService } from '@app/common/resource/application/delete/common-delete-resources.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourcesCommandHandler', () =>
{
    let commandHandler: CommonDeleteResourcesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteResourcesCommandHandler,
                {
                    provide : CommonDeleteResourcesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteResourcesCommandHandler>(CommonDeleteResourcesCommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteResourcesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteResourcesCommand(),
            )).toBe(undefined);
        });
    });
});
