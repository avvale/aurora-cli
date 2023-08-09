import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteResourceByIdCommandHandler } from './common-delete-resource-by-id.command-handler';
import { commonMockResourceData } from '@app/common/resource/infrastructure/mock/common-mock-resource.data';
import { CommonDeleteResourceByIdCommand } from './common-delete-resource-by-id.command';
import { CommonDeleteResourceByIdService } from './common-delete-resource-by-id.service';

describe('CommonDeleteResourceByIdCommandHandler', () =>
{
    let commandHandler: CommonDeleteResourceByIdCommandHandler;
    let service: CommonDeleteResourceByIdService;

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
        service = module.get<CommonDeleteResourceByIdService>(CommonDeleteResourceByIdService);
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
