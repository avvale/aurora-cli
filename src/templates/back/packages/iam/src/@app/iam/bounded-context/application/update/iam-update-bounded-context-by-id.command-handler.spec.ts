import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockBoundedContextData } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.data';
import { IamUpdateBoundedContextByIdCommandHandler } from './iam-update-bounded-context-by-id.command-handler';
import { IamUpdateBoundedContextByIdCommand } from './iam-update-bounded-context-by-id.command';
import { IamUpdateBoundedContextByIdService } from './iam-update-bounded-context-by-id.service';

describe('IamUpdateBoundedContextByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateBoundedContextByIdCommandHandler;
    let service: IamUpdateBoundedContextByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamUpdateBoundedContextByIdCommandHandler,
                {
                    provide : IamUpdateBoundedContextByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamUpdateBoundedContextByIdCommandHandler>(IamUpdateBoundedContextByIdCommandHandler);
        service = module.get<IamUpdateBoundedContextByIdService>(IamUpdateBoundedContextByIdService);
    });

    describe('main', () =>
    {
        test('UpdateBoundedContextByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an boundedContext created', async () =>
        {
            expect(await commandHandler.execute(
                new IamUpdateBoundedContextByIdCommand(
                    {
                        id: iamMockBoundedContextData[0].id,
                        name: iamMockBoundedContextData[0].name,
                        root: iamMockBoundedContextData[0].root,
                        sort: iamMockBoundedContextData[0].sort,
                        isActive: iamMockBoundedContextData[0].isActive,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
