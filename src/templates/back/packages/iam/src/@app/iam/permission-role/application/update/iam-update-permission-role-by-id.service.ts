/**
 * @aurora-generated
 * @source cliter/iam/permission-role.aurora.yaml
 */
import {
  IamIPermissionRoleRepository,
  IamPermissionRole,
} from '@app/iam/permission-role';
import {
  IamPermissionRolePermissionId,
  IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamUpdatePermissionRoleByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamIPermissionRoleRepository,
  ) {}

  async main(
    payload: {
      permissionId: IamPermissionRolePermissionId;
      roleId: IamPermissionRoleRoleId;
    },
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const permissionRole = IamPermissionRole.register(
      payload.permissionId,
      payload.roleId,
    );

    // update by id
    await this.repository.updateById(permissionRole, {
      constraint,
      cQMetadata,
      updateByIdOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const permissionRoleRegister =
      this.publisher.mergeObjectContext(permissionRole);

    permissionRoleRegister.updated({
      payload: permissionRole,
      cQMetadata,
    }); // apply event to model events
    permissionRoleRegister.commit(); // commit all events of model
  }
}
