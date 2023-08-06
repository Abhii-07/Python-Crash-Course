# 3. **Longest Common Prefix**: Given a list of strings, find the longest common prefix.
#     - *Input*: ["flower","flow","flight"]
#     - *Output*: "fl"


strs = ["flower", "flow", "flight"]

def longest_common_prefix(strs):
    if not strs:
        return ""

    prefix = strs[0]
    for word in strs[1:]:
        while not word.startswith(prefix):
            prefix = prefix[:-1]
    return prefix


print(longest_common_prefix(strs))  