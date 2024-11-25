import { SafeAreaView, View } from "react-native";
import { Text, ActivityIndicator, MD2Colors, Button } from "react-native-paper";
import { useGetData } from "../hooks/data.hook";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProcessedWord } from "../hooks/filterdata.hook";



export default function Index() {
  const { result: data, error, isPending, mutate } = useGetData()
  const router = useRouter();

  useEffect(() => {
    (async () => {
      mutate()
      const value = await AsyncStorage.getItem('WordsData');
      if (value !== null) {
        const preValue: ProcessedWord[] = JSON.parse(value);

        const currentValue = preValue.some((v) => v.word === data?.word)
          ? preValue.map((v) => (v.word === data?.word ? { ...v, ...data } : v))
          : [...preValue, data];


        if (data !== null) {
          await AsyncStorage.setItem('WordsData', JSON.stringify(currentValue));
        }
      } else if (data !== null) {

        await AsyncStorage.setItem('WordsData', JSON.stringify([data]));
      }

    })()
  }, [])

  if (!data) {
    return <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator animating={true} color={MD2Colors.red800} size="large" /></SafeAreaView>
  }

  if (isPending) {
    return <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator animating={true} color={MD2Colors.red800} size="large" /></SafeAreaView>
  }

  const handleNewWordGeneration=async()=>{
    mutate()
    const value = await AsyncStorage.getItem('WordsData');
      if (value !== null) {
        const preValue: ProcessedWord[] = JSON.parse(value);

        const currentValue = preValue.some((v) => v.word === data?.word)
          ? preValue.map((v) => (v.word === data?.word ? { ...v, ...data } : v))
          : [...preValue, data];


        if (data !== null) {
          await AsyncStorage.setItem('WordsData', JSON.stringify(currentValue));
        }
      }
  }


  return (
    <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: "space-between" }}
    >
      <View style={{ display: "flex", gap: 10 }}>
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>{data?.word}</Text>
        <View style={{ display: "flex", gap: 5 }}>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Defination: {''}<Text variant="titleMedium">{data.definition}</Text></Text>
          <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Example: {''}<Text variant="titleMedium">{data.example}</Text></Text>
        </View>
      </View>
      <View style={{ display: "flex", gap: 5 }}>
        <Button mode="contained" onPress={() => mutate()}>New word</Button>
        <Button
          mode="contained"
          icon="history"
          onPress={() => router.push("/history")}
        >
          History
        </Button>
      </View>

    </SafeAreaView>
  );
}
