import { REACT_APP_IMAGE_URL } from "@env";
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableHighlight } from "react-native";
import { Divider } from "react-native-elements";
import { PostBox } from "../components/PostBox";
import { api } from "../provider/api";
import { IUser } from "../utils/interfaces";

interface IUserProfile {
  user: IUser;
}

export const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState({} as IUser);

  useEffect(() => {
    (async () => {
      console.log('teste')
    })()
  }, [])

  useEffect(() => {
    async function getUserProfile() {
      const { data } = await api.get(`/user/${userProfile.usr_user_name}`);
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
              uri: `${REACT_APP_IMAGE_URL}/${userProfile.profile.prf_image}`,
            }}
          />
          <TouchableHighlight
            style={{ padding: 10, borderRadius: 5, backgroundColor: "blue" }}
          >
            <Text style={{ fontSize: 18, color: "#E2E3E4" }}>Seguir</Text>
          </TouchableHighlight>
        </View>

        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#E2E3E4" }}>
            {userProfile.usr_name}
          </Text>
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>
            @{userProfile.usr_user_name}
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
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>0 seguindo</Text>
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>0 seguidores</Text>
          <Text style={{ fontSize: 16, color: "#E2E3E4" }}>0 tweets</Text>
        </View>
      </View>

      <Divider color="#6A6F74" />

      {/* {userProfile?.user?.posts?.map((post) => (
        <PostBox
          key={post.pst_uuid}
          pst_uuid={post.pst_uuid}
          pst_content={post.pst_content}
          pst_createdAt={post.pst_createdAt}
          comments={post.comments}
          user={user}
        />
      ))} */}
    </>
  );
};
