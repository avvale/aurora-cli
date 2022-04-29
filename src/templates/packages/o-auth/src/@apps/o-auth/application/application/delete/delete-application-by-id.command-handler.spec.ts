import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { DeleteApplicationByIdCommandHandler } from './delete-application-by-id.command-handler';
import { applications } from '../../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';
import { DeleteApplicationByIdCommand } from './delete-application-by-id.command';
import { DeleteApplicationByIdService } from './delete-application-by-id.service';

describe('DeleteApplicationByIdCommandHandler', () =>
{
    let commandHandler: DeleteApplicationByIdCommandHandler;
    let service: DeleteApplicationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteApplicationByIdCommandHandler,
                {
                    provide: DeleteApplicationByIdService,
                    useValue: {
                        main: () => {},
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<DeleteApplicationByIdCommandHandler>(DeleteApplicationByIdCommandHandler);
        service         = module.get<DeleteApplicationByIdService>(DeleteApplicationByIdService);
    });

    describe('main', () =>
    {
        test('DeleteApplicationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the DeleteApplicationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new DeleteApplicationByIdCommand(
                    applications[0].id,
                )
            )).toBe(undefined);
        });
    });
});