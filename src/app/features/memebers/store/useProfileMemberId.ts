import { useQueryState } from "nuqs";

export const useProfileMemmberId = () => {
  return useQueryState("profileMemberId");
};
