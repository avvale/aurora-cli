import { iamMockBoundedContextData, IamUpdateBoundedContextByIdCommand } from '@app/iam/bounded-context';
import { IamUpdateBoundedContextByIdCommandHandler } from '@app/iam/bounded-context/application/update/iam-update-bounded-context-by-id.command-handler';
import { IamUpdateBoundedContextByIdService } from '@app/iam/bounded-context/application/update/iam-update-bounded-context-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateBoundedContextByIdCommandHandler', () =>
{
    let commandHandler: IamUpdateBoundedContextByIdCommandHandler;

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
