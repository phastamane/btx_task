import {Button as HeroUIButton} from "@heroui/react";
import { Plus } from "../icons/Icons";

export default function Button({
  text,
  onPress,
}: {
  text: string;
  onPress?: () => void;
}) {
  return (
    <HeroUIButton
      color="primary"
      startContent={<Plus />}
      onPress={onPress}
    >
      {text}
    </HeroUIButton>
  );
}

