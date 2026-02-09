/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonUpdateLangByIdCommand } from '@app/common/lang';
import { CommonUpdateLangByIdService } from '@app/common/lang/application/update/common-update-lang-by-id.service';
import {
  CommonLangCustomCode,
  CommonLangDir,
  CommonLangId,
  CommonLangIetf,
  CommonLangImage,
  CommonLangIsActive,
  CommonLangIso6392,
  CommonLangIso6393,
  CommonLangName,
  CommonLangSort,
} from '@app/common/lang/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateLangByIdCommand)
export class CommonUpdateLangByIdCommandHandler
  implements ICommandHandler<CommonUpdateLangByIdCommand>
{
  constructor(
    private readonly updateLangByIdService: CommonUpdateLangByIdService,
  ) {}

  async execute(command: CommonUpdateLangByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateLangByIdService.main(
      {
        id: new CommonLangId(command.payload.id),
        name: new CommonLangName(command.payload.name, { undefinable: true }),
        image: new CommonLangImage(command.payload.image),
        iso6392: new CommonLangIso6392(command.payload.iso6392, {
          undefinable: true,
        }),
        iso6393: new CommonLangIso6393(command.payload.iso6393, {
          undefinable: true,
        }),
        ietf: new CommonLangIetf(command.payload.ietf, { undefinable: true }),
        customCode: new CommonLangCustomCode(command.payload.customCode),
        dir: new CommonLangDir(command.payload.dir, { undefinable: true }),
        sort: new CommonLangSort(command.payload.sort),
        isActive: new CommonLangIsActive(command.payload.isActive, {
          undefinable: true,
        }),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
