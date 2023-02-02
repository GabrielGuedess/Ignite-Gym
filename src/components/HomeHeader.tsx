import { TouchableOpacity } from "react-native";

import { Heading, HStack, VStack, Text, Icon } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "hooks/useAuth";

import { UserPhoto } from "components/UserPhoto";

import { api } from "services/api";

import UserPhotoDefault from "assets/userPhotoDefault.png";

export const HomeHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        size={16}
        alt="Imagem do usuário"
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : UserPhotoDefault
        }
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" size={7} color="gray.200" />
      </TouchableOpacity>
    </HStack>
  );
};
