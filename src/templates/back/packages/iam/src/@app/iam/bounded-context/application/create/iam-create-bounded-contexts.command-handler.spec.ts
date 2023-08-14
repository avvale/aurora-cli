/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockBoundedContextData } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.data';
import { IamCreateBoundedContextsCommandHandler } from './iam-create-bounded-contexts.command-handler';
import { IamCreateBoundedContextsCommand } from './iam-create-bounded-contexts.command';
import { IamCreateBoundedContextsService } from './iam-create-bounded-contexts.service';

describe('iamCreateBoundedContextsCommandHandler', () =>
{
    let commandHandler: IamCreateBoundedContextsCommandHandler;
    let service: IamCreateBoundedContextsService;

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
        service = module.get<IamCreateBoundedContextsService>(IamCreateBoundedContextsService);
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockBoundedContextData createds', async () =>
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
