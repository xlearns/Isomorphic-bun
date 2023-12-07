import type { Serve } from "bun";

const api = {
  test: {
    async login(username: string, password: string) {
      return {
        token: {
          username,
          password,
        },
      };
    },
  },
};

export type Api = typeof api;

export default {
  async fetch(req) {
    const url = new URL(req.url);
    const [_appName, moduleName, methodName] = url.pathname.slice(1).split("/");
    try {
      // post请求
      const body = await req.json();
      //@ts-ignore
      const result = await api[moduleName][methodName](...body);
      return Response.json(result, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (e) {
      throw Response.error();
    }
  },
} as Serve;
