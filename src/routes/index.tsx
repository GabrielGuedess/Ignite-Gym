import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useTheme, Box } from "native-base";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

type RoutesProps = {
  onReady: () => void;
};

export function Routes({ onReady }: RoutesProps) {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} onReady={onReady}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
