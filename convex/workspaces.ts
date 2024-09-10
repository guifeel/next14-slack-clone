import { query } from "./_generated/server";

// 这个get匹配使用的 workspace.get
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});
