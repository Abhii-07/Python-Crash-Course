# 1. **Anagram Check**: Write a Python function that checks whether two given words are anagrams.
#     - *Input*: "cinema", "iceman"
#     - *Output*: "True"

word1 = "cinema"
word2 = "iceman"

def is_anagram(word1, word2):
    return sorted(word1) == sorted(word2)

print(is_anagram(word1, word2))