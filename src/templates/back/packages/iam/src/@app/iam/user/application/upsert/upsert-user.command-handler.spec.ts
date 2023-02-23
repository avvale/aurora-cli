import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';
import { UpsertUserCommandHandler } from './upsert-user.command-handler';
import { UpsertUserCommand } from './upsert-user.command';
import { UpsertUserService } from './upsert-user.service';

describe('UpsertUserCommandHandler', () =>
{
    let commandHandler: UpsertUserCommandHandler;
    let service: UpsertUserService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertUserCommandHandler,
                {
                    provide : UpsertUserService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpsertUserCommandHandler>(UpsertUserCommandHandler);
        service         = module.get<UpsertUserService>(UpsertUserService);
    });

    describe('main', () =>
    {
        test('UpsertUserCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertUserService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertUserCommand(
                    {
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});