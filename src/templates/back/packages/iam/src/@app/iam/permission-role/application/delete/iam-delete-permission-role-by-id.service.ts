/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import { IamIPermissionRoleRepository } from '@app/iam/permission-role';
import {
  IamPermissionRolePermissionId,
  IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeletePermissionRoleByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIPermissionRoleRepository,
  ) {}

  async main(
    permissionId: IamPermissionRolePermissionId,
    roleId: IamPermissionRoleRoleId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const permissionRole = await this.repository.findById(undefined, {
      constraint,
      cQMetadata,
      findArguments: {
        permissionId: permissionId.value,
        roleId: roleId.value,
      },
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(undefined, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
      findArguments: {
        permissionId: permissionRole.permissionId.value,
        roleId: permissionRole.roleId.value,
      },
    });

    // insert EventBus in object, to be able to apply and commit events
    const permissionRoleRegister =
      this.publisher.mergeObjectContext(permissionRole);

    permissionRoleRegister.deleted({
      payload: permissionRole,
      cQMetadata,
    }); // apply event to model events
    permissionRoleRegister.commit(); // commit all events of model
  }
}
