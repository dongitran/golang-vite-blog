import { SegmentedControl } from "@mantine/core";
import classes from "./tag.module.css";

export function Tag({ setValue }: { setValue: (value: string) => void }) {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["All", "Project", "DevOps", "Database"]}
      classNames={classes}
      w="60%"
      onChange={(value) => setValue(value)}
    />
  );
}
