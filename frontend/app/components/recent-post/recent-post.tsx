import { Card, Image, Text, Group } from "@mantine/core";
import classes from "./recent-post.module.css";

export function RecentPost({
  title,
  bannerImage,
  onClick,
}: {
  title: string;
  bannerImage: string;
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
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            BackEnd
          </Text>
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
