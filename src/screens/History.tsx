import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { Heading, VStack, SectionList, Text, Toast } from "native-base";

import { Loading } from "components/Loading";
import { ScreenHeader } from "components/ScreenHeader";
import { HistoryCard } from "components/HistoryCard";

import { api } from "services/api";

import { HistoryByDayDTO } from "dtos/HistoryByDayDTO";

import { AppError } from "utils/AppError";

export const History = () => {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const { data } = await api.get<HistoryByDayDTO[]>("/history");

      setExercises(data);
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Não foi possível carregar o histórico.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard {...item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily="heading"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          px={8}
        />
      )}
    </VStack>
  );
};
