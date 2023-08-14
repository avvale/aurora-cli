import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamDeleteBoundedContextByIdCommandHandler } from './iam-delete-bounded-context-by-id.command-handler';
import { iamMockBoundedContextData } from '@app/iam/bounded-context/infrastructure/mock/iam-mock-bounded-context.data';
import { IamDeleteBoundedContextByIdCommand } from './iam-delete-bounded-context-by-id.command';
import { IamDeleteBoundedContextByIdService } from './iam-delete-bounded-context-by-id.service';

describe('IamDeleteBoundedContextByIdCommandHandler', () =>
{
    let commandHandler: IamDeleteBoundedContextByIdCommandHandler;
    let service: IamDeleteBoundedContextByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteBoundedContextByIdCommandHandler,
                {
                    provide : IamDeleteBoundedContextByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamDeleteBoundedContextByIdCommandHandler>(IamDeleteBoundedContextByIdCommandHandler);
        service = module.get<IamDeleteBoundedContextByIdService>(IamDeleteBoundedContextByIdService);
    });

    describe('main', () =>
    {
        test('IamDeleteBoundedContextByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteBoundedContextByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new IamDeleteBoundedContextByIdCommand(
                    iamMockBoundedContextData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
