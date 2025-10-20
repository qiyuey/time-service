#!/usr/bin/env bun
/**
 * Time Service
 *
 * 这是一个 Model Context Protocol (MCP) 服务器，为 Claude 提供时间相关的工具。
 * MCP 是一个标准协议，允许 AI 助手与外部工具和数据源进行交互。
 */

// 导入 MCP SDK 的核心组件
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 导入项目模块
import { SERVER_CONFIG } from "./src/config.js";
import { toolDefinitions } from "./src/tool-definitions.js";
import { handleToolCall } from "./src/tool-handlers.js";
import { resources, getResourceContent } from "./src/resources.js";

/**
 * 创建 MCP 服务器实例
 */
const server = new Server(SERVER_CONFIG, {
  capabilities: {
    tools: {},
    resources: {},
  },
});

/**
 * 注册工具列表处理器
 *
 * 当 Claude 想要知道这个服务器提供哪些工具时，会发送 ListToolsRequest 请求。
 * 这个处理器返回所有可用工具的描述和参数定义。
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: toolDefinitions,
  };
});

/**
 * 注册工具调用处理器
 *
 * 当 Claude 决定调用某个工具时，会发送 CallToolRequest 请求。
 * 这个处理器根据工具名称执行相应的逻辑，并返回结果。
 */
server.setRequestHandler(CallToolRequestSchema, async (request, _extra) => {
  // Cast to the MCP ToolResponse shape to satisfy SDK typings while preserving runtime behavior
  return handleToolCall(request.params) as unknown as {
    content: Array<
      { type: string; text?: string } | { type: string; [key: string]: unknown }
    >;
    isError?: boolean;
  };
});

/**
 * 注册资源列表处理器
 *
 * 当 Claude 想要知道这个服务器提供哪些资源时，会发送 ListResourcesRequest 请求。
 * 这个处理器返回所有可用资源的描述。
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: resources,
  };
});

/**
 * 注册资源读取处理器
 *
 * 当 Claude 想要读取某个资源的内容时，会发送 ReadResourceRequest 请求。
 * 这个处理器根据资源 URI 返回相应的内容。
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  try {
    const content = getResourceContent(uri);
    return {
      contents: [
        {
          uri: uri,
          mimeType: "application/json",
          text: content,
        },
      ],
    };
  } catch (error) {
    throw new Error(
      `Failed to read resource ${uri}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
});

/**
 * 启动 MCP 服务器
 *
 * 1. 创建 StdioServerTransport：使用标准输入/输出作为通信通道
 * 2. 连接服务器和传输层：建立 MCP 协议通信
 * 3. 服务器进入运行状态，等待来自 Claude 的请求
 *
 * 注意：console.error 用于日志输出，不会影响 stdio 通信
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    `${SERVER_CONFIG.name} v${SERVER_CONFIG.version} running on stdio`,
  );
}

// 启动服务器，捕获任何启动错误
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
