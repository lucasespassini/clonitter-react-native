import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  Text,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostBox } from "../components/PostBox";
import EventSource, { EventSourceListener } from "react-native-sse";
import { REACT_APP_BASE_URL } from "@env";
import { IPost } from "../utils/interfaces";
import { api } from "../provider/api";

export const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePosts, sethHasMorePosts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  async function getPosts() {
    const value = await AsyncStorage.getItem("@Clonitter:userdata");
    if (!value) {
      navigation.navigate("Auth");
      return;
    }
    const jsonData = JSON.parse(value);

    const { data } = await api.get(
      `${REACT_APP_BASE_URL}/post/user/${jsonData.payload.usr_user_name}/followings`,
      {
        params: { page },
      }
    );

    if (!data[0]) {
      sethHasMorePosts(false);
    }

    setPosts((prev) => [...prev, ...data]);
  }

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
    navigation.addListener("focus", () => {
      console.log(posts[0]?.pst_uuid);
    });
  }, [page, navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      console.log(posts[0]?.pst_uuid);
    });
  }, [posts, navigation]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IPost>) => {
    return <PostBox {...item} />;
  }, []);

  const listFooterComponent = useCallback(() => {
    return (
      <>
        <Divider color="#6A6F74" />
        {hasMorePosts ? (
          <ActivityIndicator style={{ marginVertical: 15 }} color="#0063D1" />
        ) : (
          <Text
            style={{
              marginVertical: 15,
              color: "#6A6F74",
              textAlign: "center",
            }}
          >
            ·
          </Text>
        )}
      </>
    );
  }, [hasMorePosts]);

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
        renderItem={renderItem}
        keyExtractor={(item) => item.pst_uuid}
        ItemSeparatorComponent={() => <Divider color="#6A6F74" />}
        ListFooterComponent={listFooterComponent}
        onEndReached={() => {
          if (hasMorePosts) setPage((prev) => prev + 1);
        }}
        onEndReachedThreshold={0.1}
      />
    </>
  );
};
