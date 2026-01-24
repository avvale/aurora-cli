/**
 * @aurora-generated
 * @source cliter/iam/permission.aurora.yaml
 */
import { IamIPermissionRepository } from '@app/iam/permission';
import { IamPermissionId } from '@app/iam/permission/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeletePermissionByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIPermissionRepository,
  ) {}

  async main(
    id: IamPermissionId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const permission = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(permission.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const permissionRegister = this.publisher.mergeObjectContext(permission);

    permissionRegister.deleted({
      payload: permission,
      cQMetadata,
    }); // apply event to model events
    permissionRegister.commit(); // commit all events of model
  }
}
