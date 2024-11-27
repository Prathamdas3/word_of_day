import { useEffect, useState } from "react";
import { useGetAndUpdateData, useGetData } from "./data.hook";
import { useNetworkState } from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProcessedWord } from "./filterdata.hook";
import { useRouter } from "expo-router";
import { useColorScheme } from 'react-native'


export function useInitialPage() {
  const [data, setData] = useState<ProcessedWord | null>(null)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { result: newValue, error, mutate, isPending } = useGetAndUpdateData()
  const { result: initialValue, } = useGetData()
  const { isConnected } = useNetworkState()
  const color = useColorScheme()
  const router = useRouter()

  const handleInitialLoad = async () => {
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
  }


  const handleNewWordGeneration = async () => {
    mutate()
    if (newValue !== null) setData(newValue)
    await handleInitialLoad()
  }


  const onRefresh = () => {
    (async () => {
      setRefreshing(true)
      await handleNewWordGeneration()
      setRefreshing(false)
    })()
  }

  useEffect(() => {
    (async () => {
      setData(initialValue)
      await handleInitialLoad()
    })()

  }, [initialValue])

  return {
    refreshing, setRefreshing, handleInitialLoad, data, error, mutate, onRefresh, handleNewWordGeneration, isConnected, router, color, isPending
  }
}