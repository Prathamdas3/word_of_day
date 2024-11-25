import { Button, Card, Text } from "react-native-paper"
import { View } from 'react-native'
import { useRouter } from "expo-router";

export default function WordOfTheDayCard({ data, handleNewWordGeneration }: { data: any, handleNewWordGeneration: () => void }) {
    const router = useRouter();


    
    return <Card >
        <Card.Title
            // title={data[0]?.word.slice(0, 1).toUpperCase() + data[0]?.word.slice(1).toLowerCase()}
            titleVariant="titleLarge"
            titleStyle={{ fontWeight: "bold" }}
        />
        <Card.Content>
            <Text variant="titleMedium">Defination:</Text>
            <Text variant="titleMedium">Example:</Text>
        </Card.Content>
        <Card.Actions>
            <View style={{ width: '100%', display: "flex",  justifyContent: "center", gap: 10 }}>
                <Button mode="contained" onPress={handleNewWordGeneration}>New word</Button>
                <Button
                    mode="contained"
                    icon="history"
                    onPress={() => router.push("/history")}
                >
                    History
                </Button>
            </View>
        </Card.Actions>
    </Card>
}