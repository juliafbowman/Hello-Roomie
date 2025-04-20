import heapq
from profileManager import *

def compute_score(profile, preferences):
    score = 0

    # Age ±2 = 30 pts
    if abs(profile["age"] - preferences["age"]) <= 2:
        score += 10

    # Exact Matches = 10 pts each
    for key in ["smoking", "drinking_socially", "subleasing", "sex"]:
        if profile[key] == preferences[key]:
            score += 10

    # Country match = 10 pts
    if profile["country"].lower() == preferences["country"].lower():
        score += 10

    # Language 1 = 10 pts
    if profile["language"].lower() == preferences["language"].lower():
        score += 10

    # Language 2 = 5 pts
    if preferences.get("language_2") and profile.get("language_2") and \
       profile["language_2"].lower() == preferences["language_2"].lower():
        score += 5

    # Rent = 25 pts if within budget
    if profile["max_rent"] <= preferences["max_rent"]:
        score += 15

    # Description tag matches = 10 pts per match
    if profile["description"]:
        desc_trie = profile["descriptionTrie"]  # This is your Trie object
        for tag in preferences.get("description_tags", []):
            if desc_trie.search(tag):
                score += 2

    return score

def get_best_matches(preferences, limit=5):
    manager = ProfileManager()
    profiles = manager.get_all_profiles()
    heap = []

    for profile in profiles:
        score = compute_score(profile, preferences)
        # Use profile ID as tiebreaker
        heapq.heappush(heap, (-score, profile["id"], profile))

    matches = []
    while heap and len(matches) < limit:
        matches.append(heapq.heappop(heap)[2])

    return matches
