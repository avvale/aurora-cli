/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    SupportDeleteIssueByIdController,
    SupportDeleteIssueByIdHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteIssueByIdController', () => {
    let controller: SupportDeleteIssueByIdController;
    let handler: SupportDeleteIssueByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportDeleteIssueByIdController],
            providers: [
                {
                    provide: SupportDeleteIssueByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportDeleteIssueByIdController>(
            SupportDeleteIssueByIdController,
        );
        handler = module.get<SupportDeleteIssueByIdHandler>(
            SupportDeleteIssueByIdHandler,
        );
    });

    describe('main', () => {
        test('SupportDeleteIssueByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an issue deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(await controller.main(supportMockIssueData[0].id)).toBe(
                supportMockIssueData[0],
            );
        });
    });
});
