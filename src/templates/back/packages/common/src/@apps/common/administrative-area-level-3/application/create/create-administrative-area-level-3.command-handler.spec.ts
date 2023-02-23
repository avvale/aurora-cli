import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';
import { CreateAdministrativeAreaLevel3CommandHandler } from './create-administrative-area-level-3.command-handler';
import { CreateAdministrativeAreaLevel3Command } from './create-administrative-area-level-3.command';
import { CreateAdministrativeAreaLevel3Service } from './create-administrative-area-level-3.service';

describe('CreateAdministrativeAreaLevel3CommandHandler', () =>
{
    let commandHandler: CreateAdministrativeAreaLevel3CommandHandler;
    let service: CreateAdministrativeAreaLevel3Service;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAdministrativeAreaLevel3CommandHandler,
                {
                    provide : CreateAdministrativeAreaLevel3Service,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<CreateAdministrativeAreaLevel3CommandHandler>(CreateAdministrativeAreaLevel3CommandHandler);
        service         = module.get<CreateAdministrativeAreaLevel3Service>(CreateAdministrativeAreaLevel3Service);
    });

    describe('main', () =>
    {
        test('CreateAdministrativeAreaLevel3CommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CreateAdministrativeAreaLevel3Service', async () =>
        {
            expect(await commandHandler.execute(
                new CreateAdministrativeAreaLevel3Command(
                    {
                        id: administrativeAreasLevel3[0].id,
                        countryId: administrativeAreasLevel3[0].countryId,
                        administrativeAreaLevel1Id: administrativeAreasLevel3[0].administrativeAreaLevel1Id,
                        administrativeAreaLevel2Id: administrativeAreasLevel3[0].administrativeAreaLevel2Id,
                        code: administrativeAreasLevel3[0].code,
                        customCode: administrativeAreasLevel3[0].customCode,
                        name: administrativeAreasLevel3[0].name,
                        slug: administrativeAreasLevel3[0].slug,
                        latitude: administrativeAreasLevel3[0].latitude,
                        longitude: administrativeAreasLevel3[0].longitude,
                        zoom: administrativeAreasLevel3[0].zoom,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});