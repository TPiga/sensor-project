export const basicHandler = async (ctx, next) => {
  ctx.response.body = {
    messageCount: 10,
  };
  ctx.response.status = 200;
};
