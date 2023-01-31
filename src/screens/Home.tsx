import { useState } from "react";

import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "routes/app.routes";

import { Group } from "components/Group";
import { HomeHeader } from "components/HomeHeader";
import { ExerciseCard } from "components/ExerciseCard";

export const Home = () => {
  const [groups, setGroups] = useState<string[]>([
    "Costas",
    "Bíceps",
    "Tríceps",
    "Ombro",
  ]);
  const [exercises, setExercises] = useState<string[]>([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);
  const [groupSelected, setGroupSelected] = useState("costas");

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

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

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={() => navigate("Exercise")} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};
