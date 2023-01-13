/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { CreateAdministrativeAreasLevel1CommandHandler } from './create-administrative-areas-level-1.command-handler';
import { CreateAdministrativeAreasLevel1Command } from './create-administrative-areas-level-1.command';
import { CreateAdministrativeAreasLevel1Service } from './create-administrative-areas-level-1.service';

describe('CreateAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: CreateAdministrativeAreasLevel1CommandHandler;
    let service: CreateAdministrativeAreasLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreasLevel1CommandHandler,
                {
                    provide : CreateAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAdministrativeAreasLevel1CommandHandler>(CreateAdministrativeAreasLevel1CommandHandler);
        service         = module.get<CreateAdministrativeAreasLevel1Service>(CreateAdministrativeAreasLevel1Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return administrativeAreasLevel1 createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreasLevel1Command(
                    administrativeAreasLevel1,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});