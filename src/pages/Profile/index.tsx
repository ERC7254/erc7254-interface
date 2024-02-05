import { Text } from "@chakra-ui/react";

import Container from "@/components/Container";

import s from "./style.module.scss";

export default function ProfilePage(): React.ReactElement {
  return (
    <Container className={s.profilePage}>
      <Text fontSize="6xl">Profile</Text>
    </Container>
  );
}
