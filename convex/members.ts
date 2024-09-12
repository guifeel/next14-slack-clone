import { v } from "convex/values";
import { query } from "./_generated/server";
import { auth } from "./auth";

export const current = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getSessionId(ctx);

    if (!userId) {
      return null;
    }

    // 下面用collect会导致后面.role无这个属性，所以双唯一要用unique
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .unique();

    if (!member) {
      return null;
    }

    return member;
  },
});
