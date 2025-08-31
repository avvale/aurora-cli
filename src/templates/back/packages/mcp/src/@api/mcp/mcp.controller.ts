import { All, Controller, Logger, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { McpNestGraphQLServer } from './mcp.server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { mcpAls } from './mcp.context';
import { uuid } from '@aurorajs.dev/core';

@Controller('mcp')
export class McpController
{
    private transports = new Map<string, StreamableHTTPServerTransport>();
    private servers = new Map<string, McpServer>();
    private readonly logger = new Logger(McpController.name);

    constructor(
        private readonly mcp: McpNestGraphQLServer,
    ) {}

    @All()
    async handle(@Req() req: Request, @Res() res: Response): Promise<void>
    {
        const stateless = process.env.MCP_STATELESS === 'true';
        const sessionId = req.header('mcp-session-id') ?? undefined;
        const method = (req.body && typeof req.body === 'object' && 'method' in req.body) ? (req.body as any).method : 'unknown';
        this.logger.debug(`MCP HTTP request - method=${method} sessionId=${sessionId ?? 'none'} transports=${this.transports.size}`);

        const run = (fn: () => Promise<void>) => mcpAls.run({ sessionId }, fn);

        // Stateless mode: per-request transport, no session management
        if (stateless)
        {
            const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
            const server = this.mcp.createServer();
            res.on('close', async () => { await transport.close(); await server.close(); });
            await server.connect(transport);
            await run(() => transport.handleRequest(req, res, req.body));
            return;
        }

        let transport = sessionId ? this.transports.get(sessionId) : undefined;

        if (!transport)
        {
            if (!isInitializeRequest(req.body))
            {
                const id = (req.body && typeof req.body === 'object' && 'id' in req.body) ? (req.body).id : null;
                this.logger.warn(`Request without valid MCP session. Method: ${(req.body && (req.body).method) || 'unknown'} (GraphQL MCP).`);
                res.status(200).json({
                    jsonrpc: '2.0',
                    id,
                    error  : { code: -32000, message: 'Session not initialized or expired. Please call initialize.' },
                });
                return;
            }

            let server: McpServer | undefined;
            transport = new StreamableHTTPServerTransport({
                sessionIdGenerator  : () => uuid(),
                onsessioninitialized: (sid: string) =>
                {
                    this.logger.log(`MCP (GraphQL) session initialized: ${sid}`);
                    if (transport) this.transports.set(sid, transport);
                    // store the server created for this transport
                    if (server) this.servers.set(sid, server);
                },
                onsessionclosed: (sid: string) =>
                {
                    this.logger.log(`MCP (GraphQL) session closed (callback): ${sid}`);
                    this.transports.delete(sid);
                    this.servers.delete(sid);
                },
            });

            transport.onclose = () =>
            {
                if (transport?.sessionId)
                {
                    this.logger.log(`MCP (GraphQL) session closed: ${transport.sessionId}`);
                    this.transports.delete(transport.sessionId);
                }
            };

            // Create and attach a fresh server for this transport
            server = this.mcp.createServer();
            await server.connect(transport);
        }

        try
        {
            await run(() => transport.handleRequest(req, res, req.body));
        }
        catch (e)
        {
            const id = (req.body && typeof req.body === 'object' && 'id' in req.body) ? (req.body).id : null;
            const message = e instanceof Error ? e.message : String(e);
            this.logger.error(`Error handling MCP (GraphQL) request: ${message}`);
            if (!res.headersSent)
            {
                res.status(200).json({ jsonrpc: '2.0', id, error: { code: -32000, message }});
            }
        }
    }
}
