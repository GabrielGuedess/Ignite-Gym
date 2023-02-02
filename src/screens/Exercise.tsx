import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Heading,
  HStack,
  Text,
  VStack,
  Icon,
  Image,
  Box,
  ScrollView,
  Toast,
} from "native-base";

import { Feather } from "@expo/vector-icons";

import { AppNavigatorRoutesProps } from "routes/app.routes";

import { Button } from "components/Button";
import { Loading } from "components/Loading";

import { ExerciseDTO } from "dtos/ExerciseDTO";

import { api } from "services/api";

import { AppError } from "utils/AppError";

import BodySvg from "assets/body.svg";
import SeriesSvg from "assets/series.svg";
import RepetitionsSvg from "assets/repetitions.svg";

type ExerciseProps = {
  id: string;
};

export const Exercise = () => {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const routes = useRoute();
  const { id } = routes.params as ExerciseProps;

  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function fetchExercise() {
    try {
      setIsLoading(true);

      const { data } = await api.get<ExerciseDTO>(`/exercises/${id}`);

      setExercise(data);
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Não foi possível carregar o exercício.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post("/history", { exercise_id: id });

      Toast.show({
        title: "Parabéns! Exercício registrado no seu histórico!",
        placement: "top",
        bgColor: "green.700",
      });

      navigate("History");
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Não foi possível registar o exercício.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExercise();
  }, [id]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={goBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
};
