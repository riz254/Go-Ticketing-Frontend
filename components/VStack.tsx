import { Stack, StackProps } from "./Stack";

interface VstackProps extends StackProps { }

export function VStack(props: VstackProps) {
    return (
        <Stack {...props} direction="column" />
    );
}