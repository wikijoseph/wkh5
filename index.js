import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export default {
  async fetch(request, env, ctx) {
    try {
      // 尝试直接读取静态资源（比如 /assets/app.js）
      return await getAssetFromKV({ request, waitUntil: ctx.waitUntil });
    } catch (e) {
      // 如果路径不是文件（比如 /user/123），返回 index.html，让前端路由接管
      return await getAssetFromKV({
        request: new Request(`${new URL(request.url).origin}/index.html`),
        waitUntil: ctx.waitUntil,
      });
    }
  },
};
