/* eslint-disable key-spacing */
import { OAuthUpdateApplicationsCommand } from '@app/o-auth/application';
import { OAuthUpdateApplicationsService } from '@app/o-auth/application/application/update/o-auth-update-applications.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthUpdateApplicationsCommand)
export class OAuthUpdateApplicationsCommandHandler implements ICommandHandler<OAuthUpdateApplicationsCommand>
{
    constructor(
        private readonly updateApplicationsService: OAuthUpdateApplicationsService,
    ) {}

    async execute(command: OAuthUpdateApplicationsCommand): Promise<void>
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
