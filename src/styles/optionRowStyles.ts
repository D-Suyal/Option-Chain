import { StyleSheet } from "react-native";

const optionRowStyles = StyleSheet.create({
  row: { color: "#fff", flexDirection: "row", paddingVertical: 6, borderBottomWidth: 0.5, borderColor: "#807622ff"},
  cell: { flex: 1, color: "#000000ff", textAlign: "center" },
  call: {
    color: "#38a363ff", fontWeight: "bold", fontSize: 15,
    textShadowColor: "#b3ffd2", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2,
    alignSelf: "center", textAlign: "left", paddingLeft: 30
  },
  strike: {
    color: "#2d3748", fontWeight: "bold", fontSize: 17,
    backgroundColor: "#eaf0fa", borderRadius: 5, paddingHorizontal: 10, alignSelf: "center"
  },
  put: {
    color: "#be3333ff", fontWeight: "bold", fontSize: 15,
    textShadowColor: "#ffd3db", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2,
    alignSelf: "center", textAlign: "right", paddingRight: 30
  }
});

export default optionRowStyles;
