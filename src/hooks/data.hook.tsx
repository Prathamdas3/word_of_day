import { useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { randomWords } from "../../constant";
import { useProcessedWord } from "./filterdata.hook";


export function useGetAndUpdateData() {
  const value = useMutation({
    mutationKey: ["getAndUpdateData"],
    mutationFn: async () => {
      try {
        const i = Math.floor(Math.random() * randomWords.length)
        const { data } = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + randomWords[i]);
        return data;
      } catch (error) {
        console.error(error);
        return {}
      }
    },
  })
  
  const result = useProcessedWord(value.data && value?.data[0])

  return { ...value, result };
}


export function useGetData(){
  const {data,isLoading,error}=useQuery({
    queryKey:['getData'],
    queryFn:async()=>{
      try {
        const i = Math.floor(Math.random() * randomWords.length)
        const { data } = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + randomWords[i]);
        return data;
      } catch (error) {
        console.error(error);
        return {}
      }
    },
  })
  const result = useProcessedWord(data && data[0])

  return {result,isLoading,error}
}