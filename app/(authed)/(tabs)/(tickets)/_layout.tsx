import { Stack } from "expo-router";

export default function TicketLayout() {
    return (
        <Stack screenOptions={{ headerBackTitle:"Tickets"}}>
            <Stack.Screen name="My Tickets" />
            <Stack.Screen name="ticket/[id]" />
        </Stack>
    );
}