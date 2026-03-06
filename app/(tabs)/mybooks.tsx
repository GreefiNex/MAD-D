import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

const tabs = [
  { id: "1", name: "Reading" },
  { id: "2", name: "Finished" },
  { id: "3", name: "Favorites" },
];

const readingBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "📚",
    progress: 45,
    lastRead: "2 hours ago",
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "💰",
    progress: 28,
    lastRead: "Yesterday",
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    cover: "🎯",
    progress: 72,
    lastRead: "3 days ago",
  },
];

const finishedBooks = [
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "🌍",
    rating: 5,
    finishedDate: "Jan 2024",
  },
  {
    id: "5",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "💎",
    rating: 4,
    finishedDate: "Dec 2023",
  },
];

const favoriteBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "📚",
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "🌍",
  },
  {
    id: "6",
    title: "The 7 Habits",
    author: "Stephen Covey",
    cover: "🌟",
  },
];

export default function MyBooks() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("1");

  const renderReadingBook = ({ item }: { item: typeof readingBooks[0] }) => (
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
      </View>
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.bookAuthor, { color: colors.textMuted }]} numberOfLines={1}>
          {item.author}
        </Text>
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.primary, width: `${item.progress}%` },
            ]}
          />
        </View>
        <View style={styles.progressRow}>
          <Text style={[styles.progressText, { color: colors.textMuted }]}>
            {item.progress}% complete
          </Text>
          <Text style={[styles.lastRead, { color: colors.textMuted }]}>
            {item.lastRead}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.continueButton}>
        <Ionicons name="play" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFinishedBook = ({ item }: { item: typeof finishedBooks[0] }) => (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: colors.surface }]}
    >
      <View
        style={[
          styles.bookCover,
          { backgroundColor: colors.gradients.success[0] },
        ]}
      >
        <Text style={styles.bookEmoji}>{item.cover}</Text>
      </View>
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.bookAuthor, { color: colors.textMuted }]} numberOfLines={1}>
          {item.author}
        </Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= item.rating ? "star" : "star-outline"}
              size={14}
              color="#fbbf24"
            />
          ))}
        </View>
        <Text style={[styles.finishedDate, { color: colors.textMuted }]}>
          Finished: {item.finishedDate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFavoriteBook = ({ item }: { item: typeof favoriteBooks[0] }) => (
    <TouchableOpacity
      style={[styles.favoriteCard, { backgroundColor: colors.surface }]}
    >
      <View
        style={[
          styles.bookCover,
          { backgroundColor: colors.gradients.warning[0] },
        ]}
      >
        <Text style={styles.bookEmoji}>{item.cover}</Text>
      </View>
      <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.bookAuthor, { color: colors.textMuted }]} numberOfLines={1}>
        {item.author}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Stats Header */}
      <View style={[styles.statsHeader, { backgroundColor: colors.surface }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>3</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Reading</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.success }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Finished</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.warning }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>Favorites</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabs}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  backgroundColor:
                    activeTab === item.id ? colors.primary : "transparent",
                },
              ]}
              onPress={() => setActiveTab(item.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === item.id ? "#fff" : colors.text,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Content */}
      {activeTab === "1" && (
        <FlatList
          data={readingBooks}
          renderItem={renderReadingBook}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
      {activeTab === "2" && (
        <FlatList
          data={finishedBooks}
          renderItem={renderFinishedBook}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
      {activeTab === "3" && (
        <FlatList
          data={favoriteBooks}
          renderItem={renderFavoriteBook}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.favoritesList}
          columnWrapperStyle={styles.favoritesRow}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  bookEmoji: {
    fontSize: 28,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 13,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  progressText: {
    fontSize: 11,
  },
  lastRead: {
    fontSize: 11,
  },
  continueButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  finishedDate: {
    fontSize: 11,
    marginTop: 4,
  },
  favoritesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  favoritesRow: {
    justifyContent: "space-between",
  },
  favoriteCard: {
    width: (width - 60) / 3,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
});

