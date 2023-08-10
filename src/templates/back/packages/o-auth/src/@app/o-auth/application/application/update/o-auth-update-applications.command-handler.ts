/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthUpdateApplicationsCommand } from './o-auth-update-applications.command';
import { OAuthUpdateApplicationsService } from './o-auth-update-applications.service';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';

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
