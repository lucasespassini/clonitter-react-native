import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { REACT_APP_IMAGE_URL } from "@env";
import { Button, Divider } from "react-native-elements";
import { PostBox } from "../components/PostBox";
import { api } from "../provider/api";
import { IUser } from "../utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({} as IUser);

  useEffect(() => {
    (async () => {
      // console.log("teste");
    })();
  }, []);

  useEffect(() => {
    async function getUserProfile() {
      const value = await AsyncStorage.getItem("@Clonitter:userdata");
      if (!value) return;
      const jsonData = JSON.parse(value);
      const { data } = await api.get(`/user/${jsonData.payload.usr_user_name}`);
      setUserProfile(data);
    }
    getUserProfile();
  }, []);

  return (
    <>
      <View
        style={{
          marginTop: 15,
          marginHorizontal: 15,
        }}
      >
        <Image
          style={{
            height: 180,
            borderRadius: 5,
            backgroundColor: "#ccc",
          }}
          source={{
            uri: "https://via.placeholder.com/180",
          }}
        />
        <View
          style={{
            marginTop: -50,
            marginHorizontal: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 9999,
            }}
            source={{
              uri:
                userProfile?.profile?.prf_image &&
                `${REACT_APP_IMAGE_URL}/${userProfile.profile.prf_image}`,
            }}
          />
          <Button
            title="Editar perfil"
            buttonStyle={{
              padding: 10,
              paddingHorizontal: 15,
              borderRadius: 5,
              backgroundColor: "#0063D1",
            }}
          />
        </View>

        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#E2E3E4" }}>
            {userProfile.usr_name}
          </Text>
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>
            @{userProfile.usr_user_name}
          </Text>
        </View>

        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#E2E3E4" }}>
            {userProfile?.profile?.prf_bio}
          </Text>
        </View>

        <View
          style={{
            marginVertical: 10,
            marginBottom: 20,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>
            {userProfile?.profile?.prf_followers} seguindo
          </Text>
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>
            {userProfile?.profile?.prf_followings} seguidores
          </Text>
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>
            {userProfile?.posts?.length} tweets
          </Text>
        </View>
      </View>

      <Divider color="#6A6F74" />

      {userProfile?.posts?.map((post) => (
        <PostBox
          key={post.pst_uuid}
          pst_uuid={post.pst_uuid}
          pst_content={post.pst_content}
          pst_createdAt={post.pst_createdAt}
          comments={post.comments}
          user={{
            usr_user_name: userProfile.usr_user_name,
            usr_name: userProfile.usr_name,
            profile: userProfile.profile,
          }}
        />
      ))}
    </>
  );
};
