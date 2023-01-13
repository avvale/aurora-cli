import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { UpdateAdministrativeAreaLevel1ByIdCommandHandler } from './update-administrative-area-level-1-by-id.command-handler';
import { UpdateAdministrativeAreaLevel1ByIdCommand } from './update-administrative-area-level-1-by-id.command';
import { UpdateAdministrativeAreaLevel1ByIdService } from './update-administrative-area-level-1-by-id.service';

describe('UpdateAdministrativeAreaLevel1ByIdCommandHandler', () =>
{
    let commandHandler: UpdateAdministrativeAreaLevel1ByIdCommandHandler;
    let service: UpdateAdministrativeAreaLevel1ByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateAdministrativeAreaLevel1ByIdCommandHandler,
                {
                    provide : UpdateAdministrativeAreaLevel1ByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateAdministrativeAreaLevel1ByIdCommandHandler>(UpdateAdministrativeAreaLevel1ByIdCommandHandler);
        service         = module.get<UpdateAdministrativeAreaLevel1ByIdService>(UpdateAdministrativeAreaLevel1ByIdService);
    });

    describe('main', () =>
    {
        test('UpdateAdministrativeAreaLevel1ByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 created', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateAdministrativeAreaLevel1ByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});