import { SupportDeleteCommentsCommand } from '@app/support/comment';
import { SupportDeleteCommentsCommandHandler } from '@app/support/comment/application/delete/support-delete-comments.command-handler';
import { SupportDeleteCommentsService } from '@app/support/comment/application/delete/support-delete-comments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentsCommandHandler', () => {
    let commandHandler: SupportDeleteCommentsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SupportDeleteCommentsCommandHandler,
                {
                    provide: SupportDeleteCommentsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<SupportDeleteCommentsCommandHandler>(
            SupportDeleteCommentsCommandHandler,
        );
    });

    describe('main', () => {
        test('SupportDeleteCommentsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new SupportDeleteCommentsCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
