import { ThemeProvider } from "@mui/system";
import { useTranslation } from "react-i18next";
import { themeVariants } from "../../Themes/muiTheme";

export interface RTLProps {
  disable: boolean;
  children?: (dir: "ltr" | "rtl") => React.ReactNode;
}

/**
 * Helper provider to enable or disable RTL layout.
 *
 * You must pass the direction to immediate child element(s)
 * using a function in place of children:
 * ```
 * <RTL>
 *   {(dir) => <div dir={dir}></div>}
 * </RTL>
 * ```
 */
const RTL: React.FC<RTLProps> = (props) => {
  const { disable = false, children } = props;

  const { i18n } = useTranslation();

  const rtl = !disable && i18n.dir() === "rtl";
  const dir = rtl ? "rtl" : "ltr";

  return (
    <ThemeProvider theme={rtl ? themeVariants.RTL : themeVariants.default}>
      {children?.(dir)}
    </ThemeProvider>
  );
};

export default RTL;
