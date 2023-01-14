import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  postContentContainer: {
    alignItems: 'flex-start'
  },
  postContentUserName: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: "row",
  },
  postContentNameText: {
    color: "#E2E3E4",
    fontSize: 15
  },
  postContentUserNameText: {
    color: "#6A6F74",
    fontSize: 15
  },
  postContent: {
    marginVertical: 10,
  },
  postContentText: {
    color: "#E2E3E4",
    fontSize: 16
  },
  postInfoContainer: {
    marginTop: 5,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row"
  },
  postInfoIcon: {
    color: '#6A6F74'
  }
});