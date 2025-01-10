import { Stack, StackProps } from "./Stack";

interface HstackProps extends StackProps { }

export function HStack(props: HstackProps) {
    return (
        <Stack {...props} direction="row" />
    );
}