import { IamCreateBoundedContextCommandHandler } from './iam-create-bounded-context.command-handler';
import { IamCreateBoundedContextService } from './iam-create-bounded-context.service';
import { IamCreateBoundedContextCommand, iamMockBoundedContextData } from '@app/iam/bounded-context';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateBoundedContextCommandHandler', () =>
{
    let commandHandler: IamCreateBoundedContextCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextCommandHandler,
                {
                    provide : IamCreateBoundedContextService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateBoundedContextCommandHandler>(IamCreateBoundedContextCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateBoundedContextCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the IamCreateBoundedContextService', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateBoundedContextCommand(
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
