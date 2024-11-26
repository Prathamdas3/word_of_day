import {  Text } from "react-native-paper"
import { View } from 'react-native'
import { ProcessedWord } from "../hooks/filterdata.hook";

export default function WordOfTheDayCard({ data}: { data: ProcessedWord }) {
    return <View style={{ display: "flex", gap: 10 }}>
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>{data?.word}</Text>
        <View style={{ display: "flex", gap: 5 }}>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Defination: {''}<Text variant="titleMedium">{data?.definition}</Text></Text>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Example: {''}<Text variant="titleMedium">{data?.example}</Text></Text>
        </View>
    </View>
}