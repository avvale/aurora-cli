/* eslint-disable key-spacing */
import { OAuthUpdateAndIncrementApplicationsCommand } from '@app/o-auth/application';
import { OAuthUpdateAndIncrementApplicationsService } from '@app/o-auth/application/application/update/o-auth-update-and-increment-applications.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateAndIncrementApplicationsCommand)
export class OAuthUpdateAndIncrementApplicationsCommandHandler implements ICommandHandler<OAuthUpdateAndIncrementApplicationsCommand>
{
    constructor(
        private readonly updateApplicationsService: OAuthUpdateAndIncrementApplicationsService,
    ) {}

    async execute(command: OAuthUpdateAndIncrementApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationsService.main(
            {
                id: new OAuthApplicationId(command.payload.id, { undefinable: true }),
                code: new OAuthApplicationCode(command.payload.code, { undefinable: true }),
                name: new OAuthApplicationName(command.payload.name, { undefinable: true }),
                secret: new OAuthApplicationSecret(command.payload.secret, { undefinable: true }),
                isMaster: new OAuthApplicationIsMaster(command.payload.isMaster, { undefinable: true }),
                clientIds: new OAuthApplicationClientIds(command.payload.clientIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
