import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useTheme, Box } from "native-base";

import { useAuth } from "hooks/useAuth";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { Loading } from "components/Loading";

type RoutesProps = {
  onReady: () => void;
};

export function Routes({ onReady }: RoutesProps) {
  const { colors } = useTheme();

  const { user, isLoading } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} onReady={onReady}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
