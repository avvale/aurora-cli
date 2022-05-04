/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { roles } from '../../../../../@apps/iam/role/infrastructure/seeds/role.seed';
import { CreateRolesCommandHandler } from './create-roles.command-handler';
import { CreateRolesCommand } from './create-roles.command';
import { CreateRolesService } from './create-roles.service';

describe('CreateRolesCommandHandler', () =>
{
    let commandHandler: CreateRolesCommandHandler;
    let service: CreateRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateRolesCommandHandler,
                {
                    provide : CreateRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreateRolesCommandHandler>(CreateRolesCommandHandler);
        service         = module.get<CreateRolesService>(CreateRolesService);
    });

    describe('main', () =>
    {
        test('CreateRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return roles createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateRolesCommand(
                    roles,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});