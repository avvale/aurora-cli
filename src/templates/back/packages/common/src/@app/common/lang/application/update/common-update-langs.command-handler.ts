/* eslint-disable key-spacing */
import { CommonUpdateLangsCommand } from '@app/common/lang';
import { CommonUpdateLangsService } from '@app/common/lang/application/update/common-update-langs.service';
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

@CommandHandler(CommonUpdateLangsCommand)
export class CommonUpdateLangsCommandHandler
  implements ICommandHandler<CommonUpdateLangsCommand>
{
  constructor(private readonly updateLangsService: CommonUpdateLangsService) {}

  async execute(command: CommonUpdateLangsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateLangsService.main(
      {
        id: new CommonLangId(command.payload.id, { undefinable: true }),
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
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
