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
    if (isConnected) {
      const value = await AsyncStorage.getItem('WordsData');
      if (value !== null) {
        const preValue: ProcessedWord[] = JSON.parse(value);

        const currentValue = preValue.some((v) => v.word === data?.word)
          ? preValue.map((v) => (v.word === data?.word ? { ...v, ...newValue } : v))
          : [...preValue, data];


        if (data !== null) {
          await AsyncStorage.setItem('WordsData', JSON.stringify(currentValue));
        }
      } else if (data !== null) {
        await AsyncStorage.setItem('WordsData', JSON.stringify([data]));
      }
    }
  }

  console.log(data)
  useEffect(() => {

    setData(initialValue)
    handleInitialLoad()

  }, [initialValue])

  const handleNewWordGeneration = async () => {
    mutate()
    const value = await AsyncStorage.getItem('WordsData');
    if (value !== null) {
      const preValue: ProcessedWord[] = JSON.parse(value);

      const currentValue = preValue.some((v) => v.word === newValue?.word)
        ? preValue.map((v) => (v.word === newValue?.word ? { ...v, ...newValue } : v))
        : [...preValue, newValue];


      if (newValue !== null) {
        await AsyncStorage.setItem('WordsData', JSON.stringify(currentValue));
      }
    }
  }


  const onRefresh = () => {
    setRefreshing(true)
    handleInitialLoad()
    setRefreshing(false)
  }

  return {
    refreshing, setRefreshing, handleInitialLoad, data, error, mutate, onRefresh, handleNewWordGeneration, isConnected, router, color, isPending
  }
}