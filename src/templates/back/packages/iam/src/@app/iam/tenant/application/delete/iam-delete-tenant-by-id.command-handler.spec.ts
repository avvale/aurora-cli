import { IamDeleteTenantByIdCommand, iamMockTenantData } from '@app/iam/tenant';
import { IamDeleteTenantByIdCommandHandler } from '@app/iam/tenant/application/delete/iam-delete-tenant-by-id.command-handler';
import { IamDeleteTenantByIdService } from '@app/iam/tenant/application/delete/iam-delete-tenant-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamDeleteTenantByIdCommandHandler', () => {
    let commandHandler: IamDeleteTenantByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamDeleteTenantByIdCommandHandler,
                {
                    provide: IamDeleteTenantByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<IamDeleteTenantByIdCommandHandler>(
            IamDeleteTenantByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('IamDeleteTenantByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the IamDeleteTenantByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new IamDeleteTenantByIdCommand(iamMockTenantData[0].id),
                ),
            ).toBe(undefined);
        });
    });
});
