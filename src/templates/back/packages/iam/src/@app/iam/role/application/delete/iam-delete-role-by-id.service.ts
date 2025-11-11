import { IamIRoleRepository } from '@app/iam/role';
import { IamRoleId } from '@app/iam/role/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteRoleByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIRoleRepository,
    ) {}

    async main(
        id: IamRoleId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get object to delete
        const role = await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(role.id, {
            deleteOptions: cQMetadata?.repositoryOptions,
            cQMetadata,
        });

        // insert EventBus in object, to be able to apply and commit events
        const roleRegister = this.publisher.mergeObjectContext(role);

        roleRegister.deleted({
            payload: role,
            cQMetadata,
        }); // apply event to model events
        roleRegister.commit(); // commit all events of model
    }
}
