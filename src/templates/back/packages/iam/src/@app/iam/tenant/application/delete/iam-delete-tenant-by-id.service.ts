import { IamITenantRepository } from '@app/iam/tenant';
import { IamTenantId } from '@app/iam/tenant/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteTenantByIdService {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: IamITenantRepository,
  ) {}

  async main(
    id: IamTenantId,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // get object to delete
    const tenant = await this.repository.findById(id, {
      constraint,
      cQMetadata,
    });

    // it is not necessary to pass the constraint in the delete, if the object
    // is not found in the findById, an exception will be thrown.
    await this.repository.deleteById(tenant.id, {
      deleteOptions: cQMetadata?.repositoryOptions,
      cQMetadata,
    });

    // insert EventBus in object, to be able to apply and commit events
    const tenantRegister = this.publisher.mergeObjectContext(tenant);

    tenantRegister.deleted({
      payload: tenant,
      cQMetadata,
    }); // apply event to model events
    tenantRegister.commit(); // commit all events of model
  }
}
