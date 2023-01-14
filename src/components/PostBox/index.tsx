import React from "react";
import { Text, View, Image } from "react-native";
import { REACT_APP_IMAGE_URL } from "@env";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";
import { styles } from "./style";
import { IPost, IUser } from "../../utils/interfaces";

moment.updateLocale("pt-br", {
  relativeTime: {
    future: "em %s",
    past: "%s ago",
    s: "%ds",
    ss: "%ss",
    m: "1min",
    mm: "%dmin",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1 ano",
    yy: "%d ano",
  },
});

export const PostBox = ({
  pst_uuid,
  pst_content,
  pst_createdAt,
  user,
}: IPost) => {
  return (
    <View
      style={{
        padding: 15,
        flexDirection: "row",
      }}
    >
      <Image
        style={{ width: 60, height: 60, borderRadius: 9999 }}
        source={{
          uri:
            user?.profile?.prf_image &&
            `${REACT_APP_IMAGE_URL}/${user?.profile?.prf_image}`,
        }}
      />

      <View style={styles.container}>
        <View style={styles.postContentContainer}>
          <View style={styles.postContentUserName}>
            <Text style={styles.postContentNameText}>{user.usr_name}</Text>
            <Text> </Text>
            <Text style={styles.postContentUserNameText}>
              @{user.usr_user_name}
            </Text>
            <Text> </Text>
            <Text style={{ color: "#6A6F74" }}>
              · {moment(pst_createdAt).fromNow(true)}
            </Text>
          </View>

          <View style={styles.postContent}>
            <Text style={styles.postContentText}>{pst_content}</Text>
          </View>
        </View>

        <View style={styles.postInfoContainer}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <FontAwesome5
              name="comment"
              size={17}
              style={styles.postInfoIcon}
            />
            <Text style={{ marginLeft: 8, color: "#6A6F74" }}>0</Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <FontAwesome5 name="reply" size={17} style={styles.postInfoIcon} />
            <Text style={{ marginLeft: 8, color: "#6A6F74" }}>0</Text>
          </View>

          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <FontAwesome5 name="heart" size={17} style={styles.postInfoIcon} />
            <Text style={{ marginLeft: 8, color: "#6A6F74" }}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
