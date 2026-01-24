/* eslint-disable key-spacing */
import { CommonCreateLangsCommand } from '@app/common/lang';
import { CommonCreateLangsService } from '@app/common/lang/application/create/common-create-langs.service';
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

@CommandHandler(CommonCreateLangsCommand)
export class CommonCreateLangsCommandHandler
  implements ICommandHandler<CommonCreateLangsCommand>
{
  constructor(private readonly createLangsService: CommonCreateLangsService) {}

  async execute(command: CommonCreateLangsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createLangsService.main(
      command.payload.map((lang) => {
        return {
          id: new CommonLangId(lang.id),
          name: new CommonLangName(lang.name),
          image: new CommonLangImage(lang.image),
          iso6392: new CommonLangIso6392(lang.iso6392),
          iso6393: new CommonLangIso6393(lang.iso6393),
          ietf: new CommonLangIetf(lang.ietf),
          customCode: new CommonLangCustomCode(lang.customCode),
          dir: new CommonLangDir(lang.dir),
          sort: new CommonLangSort(lang.sort),
          isActive: new CommonLangIsActive(lang.isActive),
        };
      }),
      command.cQMetadata,
    );
  }
}
