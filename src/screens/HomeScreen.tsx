import React, { useState, useEffect, useCallback, useContext } from "react";
import { FlatList, RefreshControl, Text } from "react-native";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostBox } from "../components/PostBox";
import { api } from "../provider/api";

export const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getPosts = useCallback(async () => {
    
    const value = await AsyncStorage.getItem("@Clonitter:userdata");
    console.log(value)
    if (!value) {
      navigation.navigate("Auth");
      return;
    }
    const jsonData = JSON.parse(value);
    try {
      setRefreshing(true);
      const { data } = await api.get(
        `/post/user/${jsonData.payload.usr_user_name}/followings`
      );
      setPosts(data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getPosts();
    })();
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getPosts} />
      }
      data={posts}
      renderItem={({ item }) => <PostBox {...item} />}
      keyExtractor={(item) => item.id.toString()}
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
  );
};
