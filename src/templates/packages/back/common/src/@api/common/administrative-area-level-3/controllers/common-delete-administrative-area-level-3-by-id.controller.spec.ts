/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreaLevel3ByIdController } from './common-delete-administrative-area-level-3-by-id.controller';
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-delete-administrative-area-level-3-by-id.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonDeleteAdministrativeAreaLevel3ByIdController', () =>
{
    let controller: CommonDeleteAdministrativeAreaLevel3ByIdController;
    let handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreaLevel3ByIdController,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreaLevel3ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreaLevel3ByIdController>(CommonDeleteAdministrativeAreaLevel3ByIdController);
        handler = module.get<CommonDeleteAdministrativeAreaLevel3ByIdHandler>(CommonDeleteAdministrativeAreaLevel3ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel3ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await controller.main(administrativeAreasLevel3[0].id)).toBe(administrativeAreasLevel3[0]);
        });
    });
});