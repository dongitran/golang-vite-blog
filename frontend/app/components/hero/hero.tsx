import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "./image.svg";
import classes from "./hero.module.css";

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Hi there, I'm a <span className={classes.highlight}>dongtran</span>{" "}
          </Title>
        </div>
      </div>
    </Container>
  );
}
