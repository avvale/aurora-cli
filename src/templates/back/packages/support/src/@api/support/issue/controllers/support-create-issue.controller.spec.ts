import {
    SupportCreateIssueController,
    SupportCreateIssueHandler,
} from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateIssueController', () => {
    let controller: SupportCreateIssueController;
    let handler: SupportCreateIssueHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportCreateIssueController],
            providers: [
                {
                    provide: SupportCreateIssueHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportCreateIssueController>(
            SupportCreateIssueController,
        );
        handler = module.get<SupportCreateIssueHandler>(
            SupportCreateIssueHandler,
        );
    });

    describe('main', () => {
        test('SupportCreateIssueController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an issue created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(supportMockIssueData[0])),
            );
            expect(await controller.main(supportMockIssueData[0])).toBe(
                supportMockIssueData[0],
            );
        });
    });
});
