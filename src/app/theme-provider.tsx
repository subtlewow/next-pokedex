import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PropsWithChildren } from "react";

export default function ThemeProvider({ children, ...props }: PropsWithChildren) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}