import { Card, Image, Text, Group } from "@mantine/core";
import classes from "./recent-post.module.css";

export function RecentPost({
  title,
  bannerImage,
  tags,
  onClick,
}: {
  title: string;
  bannerImage: string;
  tags: string[];
  onClick: () => void;
}) {
  return (
    <Card
      withBorder
      radius="md"
      p={0}
      className={classes.card}
      onClick={onClick}
    >
      <Group wrap="nowrap" gap={0}>
        <Image src={bannerImage} height={160} />
        <div className={classes.body}>
          <div style={{ display: "flex" }}>
            {tags?.map((item, index) => {
              if (item.toLowerCase() !== "trending") {
                return (
                  <Text
                    tt="uppercase"
                    c="dimmed"
                    fw={700}
                    size="xs"
                    key={index}
                  >
                    {item}
                  </Text>
                );
              }
            })}
          </div>
          <Text className={classes.title} mt="xs" mb="md">
            {title}
          </Text>
          <Group wrap="nowrap" gap="xs">
            <Text size="xs" c="dimmed">
              Feb 6th
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
