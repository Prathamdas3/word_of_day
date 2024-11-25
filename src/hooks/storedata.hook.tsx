import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProcessedWord } from './filterdata.hook';


export function useStoreData(word: ProcessedWord | null) {
    (async () => {
        const data = await AsyncStorage.getItem('WordsData')
        if (data == null) {
            await AsyncStorage.setItem('WordsData', '')
        } else {
            const preValue = JSON.parse(data)
            const currentValue = [...preValue, word]
            await AsyncStorage.setItem('WordsData', JSON.stringify(currentValue))
        }
    }
    )()
}