import { Provider } from "jotai";

interface JotaiProvider {
  children: React.ReactNode;
}

const JotaiProvider = ({ children }: JotaiProvider) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
