import { useState } from "react";

import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  Toast,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";

import { AuthNavigatorRoutesProps } from "routes/auth.routes";

import { useAuth } from "hooks/useAuth";

import { Input } from "components/Input";
import { Button } from "components/Button";

import { AppError } from "utils/AppError";

import LogoSvg from "assets/logo.svg";
import BackgroundImg from "assets/background.png";

type SignInProps = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn, user } = useAuth();
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSignIn({ email, password }: SignInProps) {
    try {
      setIsLoading(true);

      await signIn(email, password);
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Não foi possível entrar. Tente novamente mais tarde.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });

      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail." }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Informe oa senha." }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>

          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigate("SignUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
