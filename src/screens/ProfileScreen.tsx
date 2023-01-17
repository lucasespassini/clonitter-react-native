import React, { useState, useEffect } from "react";
import { Text, View, Image, Modal, FlatList } from "react-native";
import { REACT_APP_BG_URL, REACT_APP_PRF_URL } from "@env";
import { Button, Divider } from "react-native-elements";
import { PostBox } from "../components/PostBox";
import { api } from "../provider/api";
import { IUser } from "../utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingLabelInput } from "../components/FloatingLabelInput";

export const ProfileScreen = ({ navigation }: any) => {
  const [userProfile, setUserProfile] = useState({} as IUser);
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    navigation.addListener("focus", () => {
      async function getUserProfile() {
        const value = await AsyncStorage.getItem("@Clonitter:userdata");
        if (!value) return;
        const jsonData = JSON.parse(value);
        const { data } = await api.get(
          `/user/${jsonData.payload.usr_user_name}`
        );
        setUserProfile(data);
      }
      getUserProfile();
    });
  }, [navigation]);

  function ProfileComponent() {
    return (
      <>
        <Modal
          animationType="slide"
          visible={modalVisible}
          statusBarTranslucent
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              // alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 52,
              backgroundColor: "#000",
            }}
          >
            <View>
              <Text style={{ color: "#fff", fontSize: 22, fontWeight: "600" }}>
                Edição de perfil
              </Text>
            </View>

            <View>
              <View style={{ marginBottom: 35 }}>
                <FloatingLabelInput label="Nome" />
              </View>
              <View style={{ marginBottom: 35 }}>
                <FloatingLabelInput label="Nome de usuário" />
              </View>
              <View style={{ marginBottom: 35 }}>
                <FloatingLabelInput label="Bio" />
              </View>
            </View>

            <View>
              <Button
                title="Atualizar"
                buttonStyle={{ marginBottom: 20, backgroundColor: "green" }}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button
                title="Cancelar"
                buttonStyle={{ backgroundColor: "red" }}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>

        <View
          style={{
            marginTop: 15,
            marginHorizontal: 15,
          }}
        >
          <Image
            style={{
              height: 220,
              borderRadius: 5,
              backgroundColor: "#000",
            }}
            source={{
              uri: userProfile?.profile?.prf_background
                ? `${REACT_APP_BG_URL}/${userProfile.profile.prf_background}`
                : "https://via.placeholder.com/60",
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
                uri: userProfile?.profile?.prf_image
                  ? `${REACT_APP_PRF_URL}/${userProfile.profile.prf_image}`
                  : "https://via.placeholder.com/60",
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
              onPress={() => setModalVisible(true)}
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
      </>
    );
  }

  return (
    <>
      <FlatList
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={getPosts}
        //     colors={["#0063D1"]}
        //     progressBackgroundColor={"#000"}
        //   />
        // }
        data={userProfile?.posts}
        renderItem={({ item }) => (
          <PostBox
            pst_uuid={item.pst_uuid}
            pst_content={item.pst_content}
            pst_createdAt={item.pst_createdAt}
            comments={item.comments}
            user={{
              usr_user_name: userProfile.usr_user_name,
              usr_name: userProfile.usr_name,
              profile: userProfile.profile,
            }}
          />
        )}
        keyExtractor={(item) => item.pst_uuid}
        ItemSeparatorComponent={() => <Divider color="#6A6F74" />}
        ListHeaderComponent={ProfileComponent}
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
      {/* {userProfile?.posts?.map((post) => (
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
      ))} */}
    </>
  );
};
