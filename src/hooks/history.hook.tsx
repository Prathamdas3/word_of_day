import { useEffect, useState } from "react";
import { ProcessedWord } from "./filterdata.hook";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

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

export default function useHistoryPage(){
    const [data, setData] = useState<ProcessedWord[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const router = useRouter()
    const color=useColorScheme()
    const onInitialLoad = async () => {
      const data = await getData()
      if (data === null) {
        setData([])
      } else {
        const d:ProcessedWord[]=JSON.parse(data)
        setData(d.reverse())
      }
    }
  
    useEffect(() => {
      onInitialLoad()
    }, [])
  
    const handleClearHistory = () => {
      removeData()
      router.back()
    }
    const onRefresh = () => {
      setRefreshing(true)
      onInitialLoad()
      setRefreshing(false)
    }
    return {data,refreshing,onRefresh,handleClearHistory,router,color}
}