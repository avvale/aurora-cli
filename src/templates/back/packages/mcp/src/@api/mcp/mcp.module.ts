import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { McpController } from './mcp.controller';
import { McpNestGraphQLServer } from './mcp.server';
import { McpAuthService } from './mcp.auth.service';

@Module({
    imports: [HttpModule],
    controllers: [McpController],
    providers: [McpNestGraphQLServer, McpAuthService],
})
export class McpModule {}

