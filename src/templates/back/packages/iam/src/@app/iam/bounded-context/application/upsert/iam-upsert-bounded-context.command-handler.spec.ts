import { iamMockBoundedContextData, IamUpsertBoundedContextCommand } from '@app/iam/bounded-context';
import { IamUpsertBoundedContextCommandHandler } from '@app/iam/bounded-context/application/upsert/iam-upsert-bounded-context.command-handler';
import { IamUpsertBoundedContextService } from '@app/iam/bounded-context/application/upsert/iam-upsert-bounded-context.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpsertBoundedContextCommandHandler', () =>
{
    let commandHandler: IamUpsertBoundedContextCommandHandler;
    let service: IamUpsertBoundedContextService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpsertBoundedContextCommandHandler,
                {
                    provide : IamUpsertBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpsertBoundedContextCommandHandler>(IamUpsertBoundedContextCommandHandler);
        service = module.get<IamUpsertBoundedContextService>(IamUpsertBoundedContextService);
    });

    describe('main', () =>
    {
        test('UpsertBoundedContextCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the IamUpsertBoundedContextService', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpsertBoundedContextCommand(
                    {
                        id: iamMockBoundedContextData[0].id,
                        name: iamMockBoundedContextData[0].name,
                        root: iamMockBoundedContextData[0].root,
                        sort: iamMockBoundedContextData[0].sort,
                        isActive: iamMockBoundedContextData[0].isActive,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
