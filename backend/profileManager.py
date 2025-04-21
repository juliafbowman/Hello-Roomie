from roommatesDB import DatabaseManager
from collections import Counter

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word.lower():
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, prefix):
        node = self.root
        for char in prefix.lower():
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word


class ProfileManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ProfileManager, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self.db = DatabaseManager()
        self.profiles = []
        self._load_profiles()
        self._initialized = True

    def _description_to_trie(self, text):
        trie = Trie()
        if text:
            words = text.strip().lower().split()  # convert whole description to lowercase
            for word in words:
                trie.insert(word)
        return trie

    def _load_profiles(self):
        self.profiles.clear()
        rows = self.db.fetch_query("SELECT * FROM posts")
        for row in rows:
            profile = dict(row)
            description_text = profile.get("description")
            profile["descriptionTrie"] = self._description_to_trie(description_text)
            self.profiles.append(profile)

    def insert_profile(self, profile_dict):
        desc_text = profile_dict.get("description")
        profile_dict["descriptionTrie"] = self._description_to_trie(desc_text)
        self.profiles.append(profile_dict)

    def search_description_prefix(self, prefix):
        matching = []
        for profile in self.profiles:
            desc_trie = profile.get("descriptionTrie")
            if desc_trie and desc_trie.search(prefix):
                matching.append(profile)
        return matching

    def get_all_profiles(self):
        return self.profiles

    def close(self):
        self.db.close()
