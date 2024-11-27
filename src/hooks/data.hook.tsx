import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { randomWords } from "../../constant";
import { useProcessedWord } from "./filterdata.hook";


export function useGetData() {
  const value = useMutation({
    mutationKey: ["getValue"],
    mutationFn: async () => {
      try {
        const i = Math.floor(Math.random() * 300)
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
