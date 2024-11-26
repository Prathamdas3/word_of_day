import { useEffect, useState } from "react";
import { useGetData } from "./data.hook";
import { useNetworkState } from "expo-network";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProcessedWord } from "./filterdata.hook";
import { useRouter } from "expo-router";

export  function useInitialPage(){
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { result: data, error, mutate } = useGetData()
    const router=useRouter()
    
    const { isConnected } = useNetworkState()
    const handleInitialLoad = async () => {
      if (isConnected) {
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
      }
    }
    useEffect(() => {
        handleInitialLoad()
      }, [])
    const handleNewWordGeneration = async () => {
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
    

    const onRefresh = () => {
        setRefreshing(true)
        handleInitialLoad()
        setRefreshing(false)
      }

    return {
        refreshing,setRefreshing,handleInitialLoad,data,error,mutate,onRefresh,handleNewWordGeneration,isConnected,router
    }
}