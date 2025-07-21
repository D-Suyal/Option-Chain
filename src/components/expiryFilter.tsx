import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import expiryFilterStyles from "../styles/expiryFilterStyles";
import { ExpiryFilterProps } from "../types/optionTypes";

const ExpiryFilter: React.FC<ExpiryFilterProps> = ({ expiries, selectedExpiry, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={expiryFilterStyles.scroll}>
    {expiries.map((exp) => (
      <TouchableOpacity
        key={exp}
        style={[
          expiryFilterStyles.btn,
          exp === selectedExpiry && expiryFilterStyles.selectedBtn
        ]}
        onPress={() => onSelect(exp)}
      >
        <Text style={exp === selectedExpiry ? expiryFilterStyles.selectedText : expiryFilterStyles.text}>
          <Text>{RenderExpiryRichText(exp)}</Text>
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

function RenderExpiryRichText(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  date.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  const daysLeft = Math.max(
    Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    0
  );
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();

  return (
    <Text>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{day} {month}</Text>
      <Text style={{ fontSize: 11 }}> ({daysLeft}d)</Text>
    </Text>
  );
}

export default React.memo(ExpiryFilter);

