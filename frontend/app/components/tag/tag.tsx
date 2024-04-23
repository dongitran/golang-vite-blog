import { SegmentedControl } from "@mantine/core";
import classes from "./tag.module.css";

export function Tag() {
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={["All", "BackEnd", "DevOps"]}
      classNames={classes}
      w="60%"
    />
  );
}
