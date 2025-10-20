const FLASK_API = "https://YOUR_FLASK_API_SERVER"; // 替换成你的 Flask API 地址

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // 1️⃣ API 请求转发到 Flask
    if (pathname.startsWith("/api/")) {
      const apiUrl = `${FLASK_API}${pathname.replace("/api", "")}${url.search}`;
      const resp = await fetch(apiUrl, {
        method: req.method,
        headers: req.headers,
        body: req.method === "POST" ? req.body : null,
      });
      return new Response(await resp.text(), resp);
    }

    // 2️⃣ 静态文件托管
    const filePath = pathname === "/" ? "/index.html" : pathname;
    try {
      const asset = await env.ASSETS.fetch(filePath);
      return asset;
    } catch (err) {
      // 如果静态文件不存在，返回 index.html（SPA 前端路由支持）
      const index = await env.ASSETS.fetch("/index.html");
      return index;
    }
  },
};
