interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return <div>频道：{title}</div>;
};

export default Header;
