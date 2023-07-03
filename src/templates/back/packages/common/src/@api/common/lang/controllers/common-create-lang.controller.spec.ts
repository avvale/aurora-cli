/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateLangController } from './common-create-lang.controller';
import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';

// sources
import { commonMockLangData } from '@app/common/lang/infrastructure/mock/common-mock-lang.data';

describe('CommonCreateLangController', () =>
{
    let controller: CommonCreateLangController;
    let handler: CommonCreateLangHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateLangController,
            ],
            providers: [
                {
                    provide : CommonCreateLangHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateLangController>(CommonCreateLangController);
        handler = module.get<CommonCreateLangHandler>(CommonCreateLangHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateLangController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockLangData[0])));
            expect(await controller.main(commonMockLangData[0])).toBe(commonMockLangData[0]);
        });
    });
});