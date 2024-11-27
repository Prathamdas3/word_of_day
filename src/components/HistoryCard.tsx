import { Text, Card } from "react-native-paper"
import { ProcessedWord } from "../hooks/filterdata.hook"


export default function HistoryCard({data}:{data: ProcessedWord}) {
 
    return <Card style={{marginTop:10}}>
        <Card.Title
            title={data.word}
            subtitle={data.date + ' ' + data.time}
            titleVariant="titleLarge"
            titleStyle={{ fontWeight: "bold" }} />
        <Card.Content>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Defination: {''}<Text variant="titleMedium">{data.definition}</Text></Text>
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Example: {''}<Text variant="titleMedium">{data.example}</Text></Text>
        </Card.Content>
    </Card>
}