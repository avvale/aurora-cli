import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { UpdateAdministrativeAreasLevel1CommandHandler } from './update-administrative-areas-level-1.command-handler';
import { UpdateAdministrativeAreasLevel1Command } from './update-administrative-areas-level-1.command';
import { UpdateAdministrativeAreasLevel1Service } from './update-administrative-areas-level-1.service';

describe('UpdateAdministrativeAreasLevel1CommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreasLevel1CommandHandler;
    let service: UpdateAdministrativeAreasLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreasLevel1CommandHandler,
                {
                    provide : UpdateAdministrativeAreasLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAdministrativeAreasLevel1CommandHandler>(UpdateAdministrativeAreasLevel1CommandHandler);
        service         = module.get<UpdateAdministrativeAreasLevel1Service>(UpdateAdministrativeAreasLevel1Service);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreasLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreasLevel1Command(
                    {
                        id: administrativeAreasLevel1[0].id,
                        countryId: administrativeAreasLevel1[0].countryId,
                        code: administrativeAreasLevel1[0].code,
                        customCode: administrativeAreasLevel1[0].customCode,
                        name: administrativeAreasLevel1[0].name,
                        slug: administrativeAreasLevel1[0].slug,
                        latitude: administrativeAreasLevel1[0].latitude,
                        longitude: administrativeAreasLevel1[0].longitude,
                        zoom: administrativeAreasLevel1[0].zoom,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});