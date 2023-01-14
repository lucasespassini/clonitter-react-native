import React, { useState, useEffect, useCallback, useContext } from "react";
import { FlatList, RefreshControl, Text } from "react-native";
import { Button, Divider, SpeedDial } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostBox } from "../components/PostBox";
import { api } from "../provider/api";
import EventSource, { EventSourceListener } from "react-native-sse";
import { REACT_APP_BASE_URL } from "@env";

export const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  async function getPosts() {
    const value = await AsyncStorage.getItem("@Clonitter:userdata");
    if (!value) {
      navigation.navigate("Auth");
      return;
    }
    const jsonData = JSON.parse(value);
    const url = new URL(
      `${REACT_APP_BASE_URL}/post/user/${jsonData.payload.usr_user_name}/followings`
    );
    url.searchParams.append("token", jsonData.token);

    const es = new EventSource(url);

    const listener: EventSourceListener = (event) => {
      if (event.type === "open") {
        setRefreshing(true);
        console.log("Open SSE connection.");
      } else if (event.type === "message") {
        if (event.data) {
          const posts = JSON.parse(event.data);
          setPosts(posts.data);
          setRefreshing(false);
        } else {
          setPosts([]);
          setRefreshing(false);
        }
      } else if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "close") {
        console.error("Connection close");
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    };

    es.addEventListener("open", listener);
    es.addEventListener("message", listener);
    es.addEventListener("close", listener);
    es.addEventListener("error", listener);

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }

  useEffect(() => {
    (async () => {
      const value = await getPosts();
      navigation.addListener("focus", () => {
        setIsFocused(true);
      });

      navigation.addListener("blur", () => {
        if (value) {
          value();
        }
        setIsFocused(false);
      });
    })();
  }, [navigation]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getPosts}
            colors={["#0063D1"]}
            progressBackgroundColor={"#000"}
          />
        }
        data={posts}
        renderItem={({ item }) => <PostBox {...item} />}
        keyExtractor={(item) => item.pst_uuid}
        ItemSeparatorComponent={() => <Divider color="#6A6F74" />}
        ListFooterComponent={() => (
          <>
            <Divider color="#6A6F74" />
            <Text
              style={{
                marginVertical: 15,
                color: "#6A6F74",
                textAlign: "center",
              }}
            >
              ·
            </Text>
          </>
        )}
      />
      <SpeedDial
        isOpen={isOpen}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        buttonStyle={{ backgroundColor: "#0063D1" }}
        onOpen={() => setIsOpen(!isOpen)}
        onClose={() => setIsOpen(!isOpen)}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </>
  );
};
