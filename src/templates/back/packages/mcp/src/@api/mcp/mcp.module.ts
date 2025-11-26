import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { McpAuthService } from './mcp.auth.service';
import { McpController } from './mcp.controller';
import { McpNestGraphQLServer } from './mcp.server';

@Module({
    imports: [HttpModule],
    controllers: [McpController],
    providers: [McpNestGraphQLServer, McpAuthService],
})
export class McpModule {}
