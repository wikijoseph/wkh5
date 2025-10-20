import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export default {
  async fetch(request, env, ctx) {
    try {
      // 尝试直接读取静态资源
      return await getAssetFromKV({ request, waitUntil: ctx.waitUntil });
    } catch (e) {
      // fallback 到 index.html
      const url = new URL(request.url);
      return await getAssetFromKV({
        request: new Request(`${url.origin}/index.html`),
        waitUntil: ctx.waitUntil,
      });
    }
  },
};
