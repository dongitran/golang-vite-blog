import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Badge,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons-react";
import classes from "./trend-post.module.css";

export function TrendingPost({
  title,
  bannerImage,
  onClick,
}: {
  title: string;
  bannerImage: string;
  onClick: () => void;
}) {
  const theme = useMantineTheme();

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={classes.card}
      onClick={onClick}
    >
      <Card.Section mb="sm">
        <Image src={bannerImage} height={180} />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        decorations
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        {title}
      </Text>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            733 people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconShare
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
