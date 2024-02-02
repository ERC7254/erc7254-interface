import { Stack } from "@chakra-ui/react";

import Container from "@/components/Container";

import HomeForm from "./components/Form";
import HomeHero from "./components/Hero";
import s from "./style.module.scss";

export default function HomePage(): React.ReactElement {
  return (
    <Container className={s.homePage}>
      <Stack spacing={6}>
        <HomeHero />
        <HomeForm />
      </Stack>
    </Container>
  );
}
