import { useCurrentMember } from "@/app/features/memebers/api/useCurrentMember";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import { MdOutlineAddReaction } from "react-icons/md";
import { Doc, Id } from "../../convex/_generated/dataModel";
import EmojiPopover from "./EmojiPopover";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
}

const Reactions = ({ data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });

  const currentMemberId = currentMember?._id;

  if (data.length == 0 || !currentMemberId) {
    return null;
  }
  return (
    <div className="flex items-center gap-1 my-1">
      {data.map((reaction) => (
        <button
          onClick={() => onChange(reaction.value)}
          key={reaction._id}
          className={cn(
            "h-6 px-2 gap-1 rounded-full bg-slate-200/70 border-transparent text-slate-800 flex items-center",
            reaction.memberIds.includes(currentMemberId) &&
              "bg-blue-100/70 border-blue-500 text-white"
          )}
        >
          {reaction.value}{" "}
          <span
            className={cn(
              "text-sm font-semibold text-muted-foreground",
              reaction.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500 text-blue-500"
            )}
          >
            {reaction.count}
          </span>
        </button>
      ))}
      <EmojiPopover
        hint="添加表情"
        onEmojiSelect={(emoji) => onChange(emoji.native)}
      >
        <button className="h-7 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-500 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};

export default Reactions;
