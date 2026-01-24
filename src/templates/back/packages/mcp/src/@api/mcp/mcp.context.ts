// src/@api/mcp/mcp.context.ts
import { AsyncLocalStorage } from 'node:async_hooks';

export type McpReqCtx = {
  sessionId?: string;
};

export const mcpAls = new AsyncLocalStorage<McpReqCtx>();
export const getMcpCtx = () => mcpAls.getStore() ?? {};
