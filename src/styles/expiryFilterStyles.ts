import { StyleSheet } from "react-native";

const expiryFilterStyles = StyleSheet.create({
  scroll: { flexDirection: "row", marginTop: 20, marginBottom: 0, minHeight: 44, maxHeight: 44 },
  btn: {
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 7, marginRight: 7,
    backgroundColor: "#e5ecf7", justifyContent: "center", elevation: 3,
    shadowColor: "#1a2540", shadowOpacity: 0.12, shadowOffset: { width: 1, height: 2 }, shadowRadius: 5,
  },
  selectedBtn: {
    backgroundColor: "#2557c2", elevation: 5, shadowColor: "#2557c2",
  },
  text: { color: "#2557c2", fontWeight: "bold" },
  selectedText: { color: "#fff", fontWeight: "bold" }
});

export default expiryFilterStyles;
