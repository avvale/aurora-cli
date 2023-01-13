/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel1ByIdController } from './common-delete-administrative-area-level-1-by-id.controller';
import { CommonDeleteAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-delete-administrative-area-level-1-by-id.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonDeleteAdministrativeAreaLevel1ByIdController', () =>
{
    let controller: CommonDeleteAdministrativeAreaLevel1ByIdController;
    let handler: CommonDeleteAdministrativeAreaLevel1ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreaLevel1ByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreaLevel1ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreaLevel1ByIdController>(CommonDeleteAdministrativeAreaLevel1ByIdController);
        handler = module.get<CommonDeleteAdministrativeAreaLevel1ByIdHandler>(CommonDeleteAdministrativeAreaLevel1ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel1ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0].id)).toBe(administrativeAreasLevel1[0]);
        });
    });
});