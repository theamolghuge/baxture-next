"use client";
import React, { useEffect, useState } from "react";
import styles from "./ui/home.module.css";
import { Card, Avatar, Text, Group, Button } from "@mantine/core";
import {
  IconWorld,
  IconAt,
  IconPhoneCall,
  IconUserPlus,
  IconTrash,
  IconUserMinus,
  IconStar,
} from "@tabler/icons-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  isFollowing?: boolean;
}

export default function HomePage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  const handleFollowToggle = (userId: number): void => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const handleDeleteUser = (userId: number): void => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className={styles.cardContainer}>
      {users.map((user) => (
        <Card key={user.id} shadow="sm" padding="md" className={styles.card}>
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="Avatar"
            radius="xl"
            size="xl"
            className={styles.avatar}
            rounded
          />
          <Group>
            <Text fz="xl" fw={500} className={styles.name}>
              {user.name}
            </Text>
            {user?.isFollowing && (
              <IconStar stroke={1.5} size="1rem" className={styles.name} />
            )}
          </Group>

          <Group wrap="nowrap">
            <div>
              <Group
                wrap="nowrap"
                gap={10}
                mt={3}
                className={styles.description}
              >
                <IconAt stroke={1.5} size="1rem" className={styles.icon} />
                <Text fz="s" c="dimmed">
                  {user.email}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall
                  stroke={1.5}
                  size="1rem"
                  className={styles.icon}
                />
                <Text fz="s" c="dimmed">
                  {user.phone}
                </Text>
              </Group>
              <Group wrap="nowrap" gap={10} mt={5} className={styles.bottom}>
                <IconWorld stroke={1.5} size="1rem" className={styles.icon} />
                <Text fz="s" c="dimmed">
                  {user.website}
                </Text>
              </Group>
            </div>
          </Group>

          <Group justify="center" spacing="xs" className={styles.btnGrp}>
            <Button
              variant={user.isFollowing ? "outline" : "active"}
              color="blue"
              onClick={() => handleFollowToggle(user.id)}
              size="md"
            >
              {user.isFollowing ? (
                <>
                  <IconUserMinus
                    stroke={1.5}
                    size="1rem"
                    className={styles.icon}
                    color="black"
                  />
                  <Text style={{ color: "black" }} className={styles.btnTxt}>
                    Unfollow
                  </Text>
                </>
              ) : (
                <>
                  <IconUserPlus
                    stroke={1.5}
                    size="1rem"
                    className={styles.icon}
                    color="white"
                  />
                  <Text className={styles.btnTxt}>Follow</Text>
                </>
              )}
            </Button>

            <Button
              size="md"
              variant="outline"
              color="blue"
              onClick={() => handleDeleteUser(user.id)}
            >
              <IconTrash
                stroke={1.5}
                size="1rem"
                className={styles.icon}
                color="blue"
              />
              <Text className={styles.btnTxt}>Delete</Text>
            </Button>
          </Group>
        </Card>
      ))}
    </div>
  );
}
