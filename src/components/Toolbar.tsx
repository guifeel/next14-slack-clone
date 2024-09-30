import { MessageSquareTextIcon, Pencil, Smile, Trash } from "lucide-react";
import EmojiPopover from "./EmojiPopover";
import Hint from "./Hint";
import { Button } from "./ui/button";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}

const Toolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleDelete,
  handleReaction,
  hideThreadButton,
}: ToolbarProps) => {
  return (
    <div className="absolute right-5 top-0">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white">
        <EmojiPopover
          hint="表情"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button size="iconSm" variant="ghost" disabled={isPending}>
            <Smile className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="回复">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="编辑">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={isPending}
              onClick={handleEdit}
            >
              <Pencil className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="删除">
            <Button
              size="iconSm"
              variant="ghost"
              disabled={isPending}
              onClick={handleDelete}
            >
              <Trash className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
