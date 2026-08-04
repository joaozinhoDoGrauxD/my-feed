import { RootStackParamList } from "@/types/rootStack.types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
