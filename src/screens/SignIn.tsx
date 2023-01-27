import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { Input } from "components/Input";
import { Button } from "components/Button";

import LogoSvg from "assets/logo.svg";
import BackgroundImg from "assets/background.png";

export const SignIn = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ flexGrow: 1 }}
  >
    <VStack flex={1} bg="gray.700" px={10} pb={16}>
      <Image
        source={BackgroundImg}
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

        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry autoCapitalize="none" />

        <Button title="Acessar" />
      </Center>

      <Center mt={24}>
        <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
          Ainda não tem acesso?
        </Text>
        <Button title="Criar conta" variant="outline" />
      </Center>
    </VStack>
  </ScrollView>
);
