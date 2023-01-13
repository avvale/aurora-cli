import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { CreateAdministrativeAreaLevel1CommandHandler } from './create-administrative-area-level-1.command-handler';
import { CreateAdministrativeAreaLevel1Command } from './create-administrative-area-level-1.command';
import { CreateAdministrativeAreaLevel1Service } from './create-administrative-area-level-1.service';

describe('CreateAdministrativeAreaLevel1CommandHandler', () =>
{
    let commandHandler: CreateAdministrativeAreaLevel1CommandHandler;
    let service: CreateAdministrativeAreaLevel1Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreaLevel1CommandHandler,
                {
                    provide : CreateAdministrativeAreaLevel1Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAdministrativeAreaLevel1CommandHandler>(CreateAdministrativeAreaLevel1CommandHandler);
        service         = module.get<CreateAdministrativeAreaLevel1Service>(CreateAdministrativeAreaLevel1Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel1CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAdministrativeAreaLevel1Service', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreaLevel1Command(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});