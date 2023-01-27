import { Button as NativeButton, IButtonProps, Text } from "native-base";

type ButtonProps = {
  title: string;
  variant?: "solid" | "outline";
} & IButtonProps;

export const Button = ({ title, variant = "solid", ...props }: ButtonProps) => (
  <NativeButton
    w="full"
    h={14}
    bg={variant === "outline" ? "transparent" : "green.700"}
    borderWidth={variant === "outline" ? 1 : 0}
    borderColor="green.500"
    rounded="sm"
    _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
    {...props}
  >
    <Text
      color={variant === "outline" ? "green.500" : "white"}
      fontFamily="heading"
      fontSize="sm"
    >
      {title}
    </Text>
  </NativeButton>
);
