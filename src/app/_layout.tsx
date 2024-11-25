import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Words", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="history"
            options={{
              title: "History", headerTitleAlign: "center",headerLeft:()=><View></View>
            }}
          />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
