import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const ITEM_MARGIN = 12;
const ITEM_WIDTH = (width - 40 - ITEM_MARGIN) / COLUMN_COUNT;

const categories = [
  { id: "1", name: "All Books", count: 156 },
  { id: "2", name: "Fiction", count: 48 },
  { id: "3", name: "Science", count: 32 },
  { id: "4", name: "Business", count: 28 },
  { id: "5", name: "History", count: 24 },
  { id: "6", name: "Biography", count: 18 },
  { id: "7", name: "Self-Help", count: 22 },
  { id: "8", name: "Technology", count: 16 },
];

const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "📖",
    category: "Fiction",
    rating: 4.5,
  },
  {
    id: "2",
    title: "1984",
    author: "George Tangka",
    cover: "📕",
    category: "Fiction",
    rating: 4.8,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "📗",
    category: "Fiction",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "📘",
    category: "Fiction",
    rating: 4.6,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "📙",
    category: "Fiction",
    rating: 4.3,
  },
  {
    id: "6",
    title: "Brave New World",
    author: "Aldous Huxley",
    cover: "📓",
    category: "Fiction",
    rating: 4.4,
  },
  {
    id: "7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "📔",
    category: "Fiction",
    rating: 4.5,
  },
  {
    id: "8",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "📖",
    category: "Fiction",
    rating: 4.9,
  },
];

export default function Ebooks() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("1");

  const renderBook = ({ item }: { item: typeof books[0] }) => (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: colors.surface }]}
    >
      <View
        style={[
          styles.bookCover,
          { backgroundColor: colors.gradients.primary[0] },
        ]}
      >
        <Text style={styles.bookEmoji}>{item.cover}</Text>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#fbbf24" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.bookInfo}>
        <Text
          style={[styles.bookTitle, { color: colors.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.bookAuthor, { color: colors.textMuted }]}
          numberOfLines={1}
        >
          {item.author}
        </Text>
        <TouchableOpacity
          style={[styles.readButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.readButtonText}>Read</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            placeholder="Search in library..."
            placeholderTextColor={colors.textMuted}
            style={[styles.searchInput, { color: colors.text }]}
          />
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
                styles.categoryTab,
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
                  styles.categoryTabText,
                  {
                    color: selectedCategory === item.id ? "#fff" : colors.text,
                  },
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.categoryCount,
                  {
                    color:
                      selectedCategory === item.id
                        ? "rgba(255,255,255,0.8)"
                        : colors.textMuted,
                  },
                ]}
              >
                {item.count}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Books Grid */}
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
        columnWrapperStyle={styles.row}
      />
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
    paddingBottom: 10,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoryCount: {
    fontSize: 11,
    marginTop: 2,
  },
  booksList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  bookCard: {
    width: ITEM_WIDTH,
    borderRadius: 12,
    marginBottom: ITEM_MARGIN,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookCover: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bookEmoji: {
    fontSize: 50,
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  ratingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 2,
  },
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    marginBottom: 8,
  },
  readButton: {
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  readButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

