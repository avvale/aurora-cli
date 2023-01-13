/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';
import { CreateAdministrativeAreasLevel2CommandHandler } from './create-administrative-areas-level-2.command-handler';
import { CreateAdministrativeAreasLevel2Command } from './create-administrative-areas-level-2.command';
import { CreateAdministrativeAreasLevel2Service } from './create-administrative-areas-level-2.service';

describe('CreateAdministrativeAreasLevel2CommandHandler', () =>
{
    let commandHandler: CreateAdministrativeAreasLevel2CommandHandler;
    let service: CreateAdministrativeAreasLevel2Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreasLevel2CommandHandler,
                {
                    provide : CreateAdministrativeAreasLevel2Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAdministrativeAreasLevel2CommandHandler>(CreateAdministrativeAreasLevel2CommandHandler);
        service         = module.get<CreateAdministrativeAreasLevel2Service>(CreateAdministrativeAreasLevel2Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreasLevel2CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return administrativeAreasLevel2 createds', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreasLevel2Command(
                    administrativeAreasLevel2,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});