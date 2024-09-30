import { format } from "date-fns";

interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mt-[88px] mx-5 mb-4 ">
      <p className="text-2xl font-bold flex items-center mb-2"># {name}</p>
      <p>
        这个频道创建于 {format(creationTime, "MMMM do,yyyy")}。这里是
        <strong> {name}</strong>频道最开始的地方
      </p>
    </div>
  );
};

export default ChannelHero;
