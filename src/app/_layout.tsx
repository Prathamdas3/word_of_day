import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import {  View, useColorScheme } from "react-native";


const queryClient = new QueryClient();

export default function RootLayout() {
  const color = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Stack screenOptions={{ headerTitleStyle: { color: `${color === 'light' ? '#1f2937' : '#e5e7eb'}` }, headerStyle: { backgroundColor: `${color === 'light' ? '#f3f4f6' : '#111827'}` }, statusBarBackgroundColor: `${color === 'light' ? '#d1d5db' : '#111827'}` }}>
          <Stack.Screen
            name="index"
            options={{ title: "Words", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="history"
            options={{
              title: "History", headerTitleAlign: "center", headerLeft: () => <View></View>
            }}
          />
        </Stack>
      </PaperProvider>
    </QueryClientProvider>
  );
}
