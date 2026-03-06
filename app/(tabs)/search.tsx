import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const recentSearches = [
  "Atomic Habits",
  "The Psychology of Money",
  "Deep Work",
  "Sapiens",
];

const categories = [
  { id: "1", name: "All", active: true },
  { id: "2", name: "Fiction", active: false },
  { id: "3", name: "Science", active: false },
  { id: "4", name: "Business", active: false },
  { id: "5", name: "History", active: false },
];

const searchResults = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "📚",
    category: "Self-Help",
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "💰",
    category: "Finance",
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    cover: "🎯",
    category: "Productivity",
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "🌍",
    category: "History",
  },
  {
    id: "5",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "🧠",
    category: "Psychology",
  },
];

export default function Search() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("1");

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            placeholder="Search books, authors, ISBN..."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === item.id
                      ? colors.primary
                      : colors.surface,
                },
              ]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === item.id ? "#fff" : colors.text,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recent Searches */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Searches
          </Text>
          <TouchableOpacity>
            <Text style={[styles.clearText, { color: colors.primary }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentList}>
          {recentSearches.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.recentItem, { backgroundColor: colors.surface }]}
            >
              <Ionicons name="time-outline" size={16} color={colors.textMuted} />
              <Text style={[styles.recentText, { color: colors.text }]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search Results */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {searchQuery ? `Results for "${searchQuery}"` : "Popular Books"}
        </Text>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.resultItem, { backgroundColor: colors.surface }]}
            >
              <View
                style={[
                  styles.resultCover,
                  { backgroundColor: colors.gradients.primary[0] },
                ]}
              >
                <Text style={styles.resultEmoji}>{item.cover}</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={[styles.resultTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.resultAuthor, { color: colors.textMuted }]}>
                  {item.author}
                </Text>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: colors.border },
                  ]}
                >
                  <Text style={[styles.categoryBadgeText, { color: colors.textMuted }]}>
                    {item.category}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingTop: 15,
    paddingLeft: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearText: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  recentText: {
    marginLeft: 6,
    fontSize: 14,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  resultCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  resultEmoji: {
    fontSize: 28,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  resultAuthor: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 6,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "500",
  },
});

