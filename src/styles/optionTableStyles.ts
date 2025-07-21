import { StyleSheet } from "react-native";

const optionTableStyles = StyleSheet.create({
  table: {
    backgroundColor: "#f8fafd", borderRadius: 10, alignSelf: "center", overflow: "hidden", marginVertical: 10, borderWidth: 1, borderColor: "#e2e8f0"
  },
  headerRow: {
    flexDirection: "row", borderBottomWidth: 1, borderColor: "#e2e8f0", backgroundColor: "#ffd70018", 
    alignItems: "center", justifyContent: "center", height: 48
  },
  headerCell: {
    flex: 1, fontWeight: "bold", color: "#24385e", textAlign: "center", fontSize: 16, letterSpacing: 0.5,
  },
  errorBox: {
    padding: 20, alignItems: "center", backgroundColor: "#fff3f4", borderRadius: 10,
    margin: 12, borderWidth: 1, borderColor: "#e67e22"
  },
  errorText: { color: "#d7263d", fontWeight: "bold", fontSize: 16 },
  retryBtn: { marginTop: 10, paddingHorizontal: 18, paddingVertical: 7, borderRadius: 7, backgroundColor: "#2557c2" },
  retryBtnText: { color: "#fff", fontWeight: "bold" },
  emptyBox: { alignItems: "center", margin: 32 },
  emptyText: { color: "#a0aec0", fontSize: 17, marginBottom: 10 }
});

export default optionTableStyles;
