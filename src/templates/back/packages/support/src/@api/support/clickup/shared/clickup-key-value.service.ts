import { ToolsKeyValueType } from '@api/graphql';
import { createKeyValue } from '@api/tools/key-value/shared';
import {
  ToolsGetKeyValuesQuery,
  ToolsKeyValueResponse,
  ToolsUpdateKeyValueByIdCommand,
} from '@app/tools/key-value';
import {
  Crypt,
  ICommandBus,
  IQueryBus,
  Operator,
  uuid,
} from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Cache } from 'cache-manager';

export const CLICKUP_TASK_PLATFORM_API_KEY = 'CLICKUP_TASK_PLATFORM_API_KEY';
export const CLICKUP_TASK_PLATFORM_FOLDER_ID =
  'CLICKUP_TASK_PLATFORM_FOLDER_ID';
export const CLICKUP_TASK_PLATFORM_LIST_ID = 'CLICKUP_TASK_PLATFORM_LIST_ID';
export const CLICKUP_TASK_PLATFORM_SPACE_ID = 'CLICKUP_TASK_PLATFORM_SPACE_ID';
export const CLICKUP_TASK_PLATFORM_TEAM_ID = 'CLICKUP_TASK_PLATFORM_TEAM_ID';
export const CLICKUP_TASK_PLATFORM_WEBHOOK_ID =
  'CLICKUP_TASK_PLATFORM_WEBHOOK_ID';

@Injectable()
export class SupportConfigService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const clickupConfigValues = await this.queryBus.ask<
      ToolsGetKeyValuesQuery,
      ToolsKeyValueResponse[]
    >(
      new ToolsGetKeyValuesQuery({
        where: {
          key: {
            [Operator.or]: [
              CLICKUP_TASK_PLATFORM_API_KEY,
              CLICKUP_TASK_PLATFORM_FOLDER_ID,
              CLICKUP_TASK_PLATFORM_LIST_ID,
              CLICKUP_TASK_PLATFORM_SPACE_ID,
              CLICKUP_TASK_PLATFORM_TEAM_ID,
              CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
            ],
          },
        },
      }),
    );

    /* #region CLICKUP_TASK_PLATFORM_API_KEY */
    const clickupTaskPlatformApiKey = clickupConfigValues.find(
      (value) => value.key === CLICKUP_TASK_PLATFORM_API_KEY,
    );

    if (clickupTaskPlatformApiKey) {
      try {
        await this.cacheManager.set(
          CLICKUP_TASK_PLATFORM_API_KEY,
          Crypt.decryptWithAuroraPrivateKey(clickupTaskPlatformApiKey.value),
        );
      } catch {
        Logger.warn(
          `Failed to decrypt ${CLICKUP_TASK_PLATFORM_API_KEY}. Resetting value.`,
          'SupportConfigService',
        );

        await this.commandBus.dispatch(
          new ToolsUpdateKeyValueByIdCommand({
            id: clickupTaskPlatformApiKey.id,
            value: null,
          }),
        );
      }
    } else {
      void createKeyValue(this.moduleRef, {
        id: uuid(),
        key: CLICKUP_TASK_PLATFORM_API_KEY as string,
        type: ToolsKeyValueType.SECRET,
        value: null,
        isCached: true,
        isActive: true,
        description: 'API key for the clickup task platform',
      });
    }
    /* #endregion CLICKUP_TASK_PLATFORM_API_KEY */

    /* #region CLICKUP_TASK_PLATFORM_TEAM_ID */
    const clickupTaskPlatformTeamId = clickupConfigValues.find(
      (value) => value.key === CLICKUP_TASK_PLATFORM_TEAM_ID,
    );

    if (clickupTaskPlatformTeamId) {
      await this.cacheManager.set(
        CLICKUP_TASK_PLATFORM_TEAM_ID,
        clickupTaskPlatformTeamId.value,
      );
    } else {
      void createKeyValue(this.moduleRef, {
        id: uuid(),
        key: CLICKUP_TASK_PLATFORM_TEAM_ID as string,
        type: ToolsKeyValueType.STRING,
        value: null,
        isCached: true,
        isActive: true,
        description: 'Team ID for the clickup task platform',
      });
    }
    /* #endregion CLICKUP_TASK_PLATFORM_TEAM_ID */

    /* #region CLICKUP_TASK_PLATFORM_SPACE_ID */
    const clickupTaskPlatformSpaceId = clickupConfigValues.find(
      (value) => value.key === CLICKUP_TASK_PLATFORM_SPACE_ID,
    );

    if (clickupTaskPlatformSpaceId) {
      await this.cacheManager.set(
        CLICKUP_TASK_PLATFORM_SPACE_ID,
        clickupTaskPlatformSpaceId.value,
      );
    } else {
      void createKeyValue(this.moduleRef, {
        id: uuid(),
        key: CLICKUP_TASK_PLATFORM_SPACE_ID as string,
        type: ToolsKeyValueType.STRING,
        value: null,
        isCached: true,
        isActive: true,
        description: 'Space ID for the clickup task platform',
      });
    }
    /* #endregion CLICKUP_TASK_PLATFORM_SPACE_ID */

    /* #region CLICKUP_TASK_PLATFORM_FOLDER_ID */
    const clickupTaskPlatformFolderId = clickupConfigValues.find(
      (value) => value.key === CLICKUP_TASK_PLATFORM_FOLDER_ID,
    );

    if (clickupTaskPlatformFolderId) {
      await this.cacheManager.set(
        CLICKUP_TASK_PLATFORM_FOLDER_ID,
        clickupTaskPlatformFolderId.value,
      );
    } else {
      void createKeyValue(this.moduleRef, {
        id: uuid(),
        key: CLICKUP_TASK_PLATFORM_FOLDER_ID,
        type: ToolsKeyValueType.STRING,
        value: null,
        isCached: true,
        isActive: true,
        description: 'Folder ID for the clickup task platform',
      });
    }
    /* #endregion CLICKUP_TASK_PLATFORM_FOLDER_ID */

    /* #region CLICKUP_TASK_PLATFORM_LIST_ID */
    const clickupTaskPlatformListId = clickupConfigValues.find(
      (value) => value.key === CLICKUP_TASK_PLATFORM_LIST_ID,
    );

    if (clickupTaskPlatformListId) {
      await this.cacheManager.set(
        CLICKUP_TASK_PLATFORM_LIST_ID,
        clickupTaskPlatformListId.value,
      );
    } else {
      void createKeyValue(this.moduleRef, {
        id: uuid(),
        key: CLICKUP_TASK_PLATFORM_LIST_ID,
        type: ToolsKeyValueType.STRING,
        value: null,
        isCached: true,
        isActive: true,
        description: 'List ID for the clickup task platform',
      });
    }
    /* #endregion CLICKUP_TASK_PLATFORM_LIST_ID */

    /* #region CLICKUP_TASK_PLATFORM_WEBHOOK_ID */
    const clickupTaskPlatformWebhookId = clickupConfigValues.find(
      (value) => value.key === CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
    );

    if (clickupTaskPlatformWebhookId) {
      await this.cacheManager.set(
        CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
        clickupTaskPlatformWebhookId.value,
      );
    } else {
      void createKeyValue(this.moduleRef, {
        id: uuid(),
        key: CLICKUP_TASK_PLATFORM_WEBHOOK_ID,
        type: ToolsKeyValueType.STRING,
        value: null,
        isCached: true,
        isActive: true,
        description: 'Webhook ID for the clickup task platform',
      });
    }
    /* #endregion CLICKUP_TASK_PLATFORM_WEBHOOK_ID */
  }
}
