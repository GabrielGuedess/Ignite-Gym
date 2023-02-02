import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";

import { Entypo } from "@expo/vector-icons";

import { ExerciseDTO } from "dtos/ExerciseDTO";

import { api } from "services/api";

type ExerciseCard = {
  data: ExerciseDTO;
} & TouchableOpacityProps;

export const ExerciseCard = ({ data, ...props }: ExerciseCard) => (
  <TouchableOpacity {...props}>
    <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
      <Image
        source={{
          uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
        }}
        alt="Imagem do exercício"
        resizeMode="cover"
        w={16}
        h={16}
        rounded="md"
        mr={4}
      />

      <VStack flex={1}>
        <Heading fontSize="lg" color="white" fontFamily="heading">
          {data.name}
        </Heading>

        <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
          {data.series} séries x {data.repetitions} repetições
        </Text>
      </VStack>

      <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
    </HStack>
  </TouchableOpacity>
);
