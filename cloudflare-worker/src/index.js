export default {
  async fetch(request) {
    const url = new URL(request.url);
    return Response.json({
      ok: true,
      service: "qwenprojects",
      path: url.pathname,
      method: request.method
    });
  }
};
