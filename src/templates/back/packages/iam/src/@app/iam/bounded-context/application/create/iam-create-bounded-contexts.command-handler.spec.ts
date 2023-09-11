import { IamCreateBoundedContextsCommand, iamMockBoundedContextData } from '@app/iam/bounded-context';
import { IamCreateBoundedContextsCommandHandler } from '@app/iam/bounded-context/application/create/iam-create-bounded-contexts.command-handler';
import { IamCreateBoundedContextsService } from '@app/iam/bounded-context/application/create/iam-create-bounded-contexts.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('iamCreateBoundedContextsCommandHandler', () =>
{
    let commandHandler: IamCreateBoundedContextsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextsCommandHandler,
                {
                    provide : IamCreateBoundedContextsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateBoundedContextsCommandHandler>(IamCreateBoundedContextsCommandHandler);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockBoundedContextData created', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateBoundedContextsCommand(
                    iamMockBoundedContextData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
