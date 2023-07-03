/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel3ByIdController } from './common-update-administrative-area-level-3-by-id.controller';
import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-update-administrative-area-level-3-by-id.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonUpdateAdministrativeAreaLevel3ByIdController', () =>
{
    let controller: CommonUpdateAdministrativeAreaLevel3ByIdController;
    let handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreaLevel3ByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreaLevel3ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreaLevel3ByIdController>(CommonUpdateAdministrativeAreaLevel3ByIdController);
        handler = module.get<CommonUpdateAdministrativeAreaLevel3ByIdHandler>(CommonUpdateAdministrativeAreaLevel3ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel3ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel3 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel3Data[0])).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});