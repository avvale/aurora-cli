import { IamAddRolesContextEvent, IamIRoleRepository } from '@app/iam/role';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteRolesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const roles = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (roles.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddRolesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const rolesRegistered = this.publisher.mergeObjectContext(
            new IamAddRolesContextEvent(
                roles,
                cQMetadata,
            ),
        );

        rolesRegistered.deleted(); // apply event to model events
        rolesRegistered.commit(); // commit all events of model
    }
}
