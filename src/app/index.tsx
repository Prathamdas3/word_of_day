import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text, ActivityIndicator, MD2Colors, Button } from "react-native-paper";
import { useInitialPage } from "../hooks/initial.hook";
import WordOfTheDayCard from "../components/WordOfTheDayCard";

export default function Index() {
  const { data, error, onRefresh, handleNewWordGeneration, refreshing, isConnected, router } = useInitialPage()


  if (!data) {
    return <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} size="large" />
    </SafeAreaView>
  }

  if (error) {
    return <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>Error while Loading </Text>
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>Please restart the app </Text>
    </SafeAreaView>
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1, padding: 20, justifyContent: "space-between" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isConnected ? <WordOfTheDayCard data={data} /> :
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
              <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>No Internet</Text>
            </View>}
          <View style={{ display: "flex", gap: 5 }}>
            <Button mode="contained" onPress={handleNewWordGeneration} disabled={!isConnected}>New word</Button>
            <Button
              mode="contained"
              icon="history"
              onPress={() => router.push("/history")}
            >
              History
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}
