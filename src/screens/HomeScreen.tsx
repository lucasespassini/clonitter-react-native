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
import { SpeedDial } from "../components/SpeedDial";

export const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function getPosts() {
    const value = await AsyncStorage.getItem("@Clonitter:userdata");
    if (!value) {
      navigation.navigate("Auth");
      return;
    }
    const jsonData = JSON.parse(value);

    const { data } = await api.get(
      `/post/user/${jsonData.payload.usr_user_name}/followings`,
      {
        params: { page },
      }
    );

    if (!data[0]) {
      setHasMorePosts(false);
    }

    if (!posts[0]) {
      setPosts((prev) => [...prev, ...data]);
    } else {
    }
  }

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, [page]);

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
              fontWeight: "900",
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
      <SpeedDial />
    </>
  );
};
