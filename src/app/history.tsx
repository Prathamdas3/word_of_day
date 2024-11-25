import { SafeAreaView, View } from "react-native";
import { Button, Text } from 'react-native-paper'
import { FlashList } from '@shopify/flash-list'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ProcessedWord } from "../hooks/filterdata.hook";
import HistoryCard from "../components/HistoryCard";

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('WordsData')
    getData()
  } catch (error) {
    console.log(error)
  }
}

const getData = async () => {
  try {
    const data = await AsyncStorage.getItem('WordsData')
    if (data == null) {
      return null
    }
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function HistoryScreen() {
  const [data, setData] = useState<ProcessedWord[]>([])
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const data = await getData()
      console.log(data)
      if (data === null) {
        setData([])
      } else {
        setData(JSON.parse(data))
      }
    })()
  }, [])
  console.log(data)

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", padding: 20 }}>

      {data.length > 0 ? <FlashList
        data={data}
        renderItem={({ item }) => <HistoryCard data={item} />}
        estimatedItemSize={200}
        keyExtractor={(Item) => Item.word}
        contentContainerStyle={{ padding: 10 }}
      />
        : <View style={{ display: "flex", justifyContent: "center", alignItems:"center" }}><Text variant="titleMedium">Empty History</Text></View>}

      <View style={{ display: "flex", gap: 5 }}>
        <Button mode="contained" icon="delete" buttonColor="#dc2626" onPress={removeData}>Clear History</Button>
        <Button mode="contained" icon="home" onPress={() => router.back()}>Back Home</Button>
      </View>
    </SafeAreaView>
  );
}
