import { ClickupSpace } from '@api/graphql';
import { ClickupSpaceDto } from '@api/support/clickup/dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';
import { CLICKUP_TASK_PLATFORM_API_KEY } from '../shared/clickup-key-value.service';
import { ClickupService } from '../shared/clickup.service';

@Injectable()
export class ClickupSpaceHandler {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly clickupService: ClickupService,
    ) {}

    async main(teamId?: string): Promise<ClickupSpace[] | ClickupSpaceDto[]> {
        const supportTaskPlatformApiKey = await this.cacheManager.get<string>(
            CLICKUP_TASK_PLATFORM_API_KEY,
        );

        return await lastValueFrom(
            this.clickupService.getSpaces(teamId, {
                authorization: supportTaskPlatformApiKey,
            }),
        );
    }
}
