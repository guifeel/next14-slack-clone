import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";
import { Doc, Id } from "../../convex/_generated/dataModel";
import Hint from "./Hint";

const Renderer = dynamic(() => import("@/components/Renderer"), { ssr: false });

const formatFullTime = (date: Date) => {
  return `${isToday(date) ? "今天" : isYesterday(date) ? "昨天" : format(date, "MMM d,yyyy")} 于 ${format(date, "h:mm:ss a")}`;
};
interface MessageProps {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadName?: string;
  threadTimestamp?: number;
}

const Message = ({
  id,
  isAuthor,
  memberId,
  authorImage,
  authorName = "Member",
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadCount,
  threadImage,
  threadName,
  threadTimestamp,
}: MessageProps) => {
  console.log(createdAt);
  return (
    <div className="flex flex-col hover:bg-gray-100/60 gap-2 px-5 py-1.5 group relative:">
      <div className="flex items-start gap-2">
        <Hint label={formatFullTime(new Date(createdAt))}>
          <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100">
            {format(new Date(createdAt), "hh:mm")}
          </button>
        </Hint>
      </div>
      <Renderer value={body} />
    </div>
  );
};

export default Message;
