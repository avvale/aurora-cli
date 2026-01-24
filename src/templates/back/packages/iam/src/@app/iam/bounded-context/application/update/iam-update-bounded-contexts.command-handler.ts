/**
 * @aurora-generated
 * @source cliter/iam/bounded-context.aurora.yaml
 */
import { IamUpdateBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamUpdateBoundedContextsService } from '@app/iam/bounded-context/application/update/iam-update-bounded-contexts.service';
import {
  IamBoundedContextId,
  IamBoundedContextIsActive,
  IamBoundedContextName,
  IamBoundedContextRoot,
  IamBoundedContextSort,
} from '@app/iam/bounded-context/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(IamUpdateBoundedContextsCommand)
export class IamUpdateBoundedContextsCommandHandler
  implements ICommandHandler<IamUpdateBoundedContextsCommand>
{
  constructor(
    private readonly updateBoundedContextsService: IamUpdateBoundedContextsService,
  ) {}

  async execute(command: IamUpdateBoundedContextsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateBoundedContextsService.main(
      {
        id: new IamBoundedContextId(command.payload.id, {
          undefinable: true,
        }),
        name: new IamBoundedContextName(command.payload.name, {
          undefinable: true,
        }),
        root: new IamBoundedContextRoot(command.payload.root, {
          undefinable: true,
        }),
        sort: new IamBoundedContextSort(command.payload.sort),
        isActive: new IamBoundedContextIsActive(command.payload.isActive, {
          undefinable: true,
        }),
      },
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
