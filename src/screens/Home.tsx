import { useCallback, useEffect, useState } from "react";

import { VStack, FlatList, HStack, Heading, Text, Toast } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "routes/app.routes";

import { Group } from "components/Group";
import { Loading } from "components/Loading";
import { HomeHeader } from "components/HomeHeader";
import { ExerciseCard } from "components/ExerciseCard";

import { api } from "services/api";

import { AppError } from "utils/AppError";

import { ExerciseDTO } from "dtos/ExerciseDTO";

export const Home = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("costas");
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const { data } = await api.get<string[]>("/groups");

      setGroups(data);
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Não foi possível carregar os grupos musculares.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const { data } = await api.get<ExerciseDTO[]>(
        `/exercises/bygroup/${groupSelected}`
      );

      setExercises(data);
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Não foi possível carregar os exercícios.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        horizontal
        data={groups}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        my={10}
        maxH={10}
        minH={10}
        _contentContainerStyle={{ px: 8 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>
            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => navigate("Exercise", { id: item.id })}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
};
