import { Colors } from "../types";

interface Icon {
  size?: "verySmall" | "small" | "normal" | "large" | "veryLarge";
  provider?: "material-icons";
  name: string;
  color?: Colors;
  type: "svg" | "icon";
  padding?:string;
  margin?: string;
}

export default Icon;
 