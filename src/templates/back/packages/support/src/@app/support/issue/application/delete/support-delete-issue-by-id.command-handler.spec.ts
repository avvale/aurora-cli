import {
    SupportDeleteIssueByIdCommand,
    supportMockIssueData,
} from '@app/support/issue';
import { SupportDeleteIssueByIdCommandHandler } from '@app/support/issue/application/delete/support-delete-issue-by-id.command-handler';
import { SupportDeleteIssueByIdService } from '@app/support/issue/application/delete/support-delete-issue-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteIssueByIdCommandHandler', () => {
    let commandHandler: SupportDeleteIssueByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportDeleteIssueByIdCommandHandler,
                {
                    provide: SupportDeleteIssueByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<SupportDeleteIssueByIdCommandHandler>(
            SupportDeleteIssueByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('SupportDeleteIssueByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the SupportDeleteIssueByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new SupportDeleteIssueByIdCommand(
                        supportMockIssueData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
