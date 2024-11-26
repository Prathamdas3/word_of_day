import { Button, Text } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import HistoryCard from "../components/HistoryCard";
import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useHistoryPage from '../hooks/history.hook';


export default function HistoryScreen() {
  const { refreshing, onRefresh, data, handleClearHistory, router, color } = useHistoryPage()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1 }, { backgroundColor: `${color === 'light' ? '#e5e7eb' : '#1f2937'}` }]}>
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: "space-between", padding: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {data.length > 0 ? <FlashList
            data={data}
            renderItem={({ item }) => <HistoryCard data={item} />}
            estimatedItemSize={200}
            keyExtractor={(Item) => Item.word}
            contentContainerStyle={{ padding: 10 }}
          />
            : <View style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '90%' }}><Text variant="titleMedium">Empty History</Text></View>}

          <View style={{ display: "flex", gap: 5 }}>
            <Button mode="contained" icon="delete" buttonColor="#dc2626" onPress={handleClearHistory} >Clear History</Button>
            <Button mode="contained" icon="home" onPress={() => router.back()}>Back Home</Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
