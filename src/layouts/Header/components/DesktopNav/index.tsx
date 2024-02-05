import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { INavItem } from "@/constants/navList";

import s from "../../style.module.scss";

interface IDesktopNav {
  navList: INavItem[];
}

export default function DesktopNav({
  navList,
}: IDesktopNav): React.ReactElement {
  const pathname = usePathname();

  return (
    <HStack gap={6}>
      {navList.map((navItem) => {
        return (
          <Link
            href={navItem.link}
            key={navItem.name}
            className={`${s.header_link} ${pathname === navItem.link ? s.active : ""}`}
          >
            <Text fontSize="md" fontWeight="bold">
              {navItem.name}
            </Text>
          </Link>
        );
      })}
    </HStack>
  );
}
