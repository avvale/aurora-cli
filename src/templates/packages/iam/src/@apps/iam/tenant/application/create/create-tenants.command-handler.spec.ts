/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { tenants } from '../../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { CreateTenantsCommandHandler } from './create-tenants.command-handler';
import { CreateTenantsCommand } from './create-tenants.command';
import { CreateTenantsService } from './create-tenants.service';

describe('CreateTenantsCommandHandler', () =>
{
    let commandHandler: CreateTenantsCommandHandler;
    let service: CreateTenantsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTenantsCommandHandler,
                {
                    provide : CreateTenantsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        commandHandler  = module.get<CreateTenantsCommandHandler>(CreateTenantsCommandHandler);
        service         = module.get<CreateTenantsService>(CreateTenantsService);
    });

    describe('main', () =>
    {
        test('CreateTenantsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return tenants createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateTenantsCommand(
                    tenants,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});