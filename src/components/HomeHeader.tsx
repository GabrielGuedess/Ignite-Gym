import { TouchableOpacity } from "react-native";

import { Heading, HStack, VStack, Text, Icon } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "components/UserPhoto";

export const HomeHeader = () => (
  <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
    <UserPhoto
      size={16}
      alt="Imagem do usuário"
      source={{ uri: "https://github.com/GabrielGuedess.png" }}
      mr={4}
    />

    <VStack flex={1}>
      <Text color="gray.100" fontSize="md">
        Olá
      </Text>
      <Heading color="gray.100" fontSize="md" fontFamily="heading">
        Gabriel
      </Heading>
    </VStack>

    <TouchableOpacity>
      <Icon as={MaterialIcons} name="logout" size={7} color="gray.200" />
    </TouchableOpacity>
  </HStack>
);
