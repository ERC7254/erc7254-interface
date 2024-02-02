import { Box, Card, CardBody, CardHeader, SimpleGrid } from "@chakra-ui/react";

import Autocomplete from "@/components/Autocomplete";
import Input from "@/components/Input";
import Title from "@/components/Title";

import s from "./style.module.scss";

export default function HomeForm(): React.ReactElement {
  return (
    <Box className={s.form}>
      <Card className={s.form_inner}>
        <CardHeader>
          <Title size="sm" color="brand.yellow.200">
            Create NEW
          </Title>
          <Title size="sm" color="brand.yellow.200">
            Token Revenue Sharing
          </Title>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Input label="Name" isRequired />
            <Input label="Symbol" isRequired />
            <Input label="Reward" isRequired />
            <Autocomplete label="Reward" />
            <Input label="Total supply" isRequired />
          </SimpleGrid>
        </CardBody>
      </Card>
    </Box>
  );
}
