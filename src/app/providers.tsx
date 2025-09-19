"use client";

import { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apollo-client";
import ThemeProvider from "./theme-provider";

export function Providers({ children }: PropsWithChildren) {
    return (
        <SidebarProvider>
            <main>
                <ApolloProvider client={client}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >{children}</ThemeProvider>
                </ApolloProvider>
            </main>
        </SidebarProvider>
    )
}