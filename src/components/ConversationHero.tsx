import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

const ConversationHero = ({ name = "成员", image }: ConversationHeroProps) => {
  const callbackName = name?.charAt(0).toUpperCase();
  return (
    <div className="mt-[88px] mx-5 mb-4 ">
      <div className="flex items-center gap-x-1 mb-2">
        <Avatar className="size-14 mr-2">
          <AvatarImage src={image} />
          <AvatarFallback>{callbackName}</AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold "># {name}</p>
      </div>
      <p>
        这个会话仅你存于你和
        <strong> {name}</strong>
      </p>
    </div>
  );
};

export default ConversationHero;
