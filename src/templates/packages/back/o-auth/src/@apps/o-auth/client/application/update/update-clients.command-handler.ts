/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClientsCommand } from './update-clients.command';
import { UpdateClientsService } from './update-clients.service';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopes,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateClientsCommand)
export class UpdateClientsCommandHandler implements ICommandHandler<UpdateClientsCommand>
{
    constructor(
        private readonly updateClientsService: UpdateClientsService,
    ) {}

    async execute(command: UpdateClientsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateClientsService.main(
            {
                id: new ClientId(command.payload.id, { undefinable: true }),
                grantType: new ClientGrantType(command.payload.grantType, { undefinable: true }),
                name: new ClientName(command.payload.name, { undefinable: true }),
                secret: new ClientSecret(command.payload.secret, { undefinable: true }),
                authUrl: new ClientAuthUrl(command.payload.authUrl),
                redirect: new ClientRedirect(command.payload.redirect),
                scopes: new ClientScopes(command.payload.scopes),
                expiredAccessToken: new ClientExpiredAccessToken(command.payload.expiredAccessToken),
                expiredRefreshToken: new ClientExpiredRefreshToken(command.payload.expiredRefreshToken),
                isActive: new ClientIsActive(command.payload.isActive, { undefinable: true }),
                isMaster: new ClientIsMaster(command.payload.isMaster, { undefinable: true }),
                applicationIds: new ClientApplicationIds(command.payload.applicationIds),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}