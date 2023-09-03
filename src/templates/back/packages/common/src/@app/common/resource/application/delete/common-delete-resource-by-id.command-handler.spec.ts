import { CommonDeleteResourceByIdCommand, commonMockResourceData } from '@app/common/resource';
import { CommonDeleteResourceByIdCommandHandler } from '@app/common/resource/application/delete/common-delete-resource-by-id.command-handler';
import { CommonDeleteResourceByIdService } from '@app/common/resource/application/delete/common-delete-resource-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourceByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteResourceByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonDeleteResourceByIdCommandHandler,
                {
                    provide : CommonDeleteResourceByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonDeleteResourceByIdCommandHandler>(CommonDeleteResourceByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteResourceByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the CommonDeleteResourceByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonDeleteResourceByIdCommand(
                    commonMockResourceData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
