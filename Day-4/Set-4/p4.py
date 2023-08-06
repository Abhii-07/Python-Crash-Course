# 4. **String Permutations**: Write a Python function to calculate all permutations of a given string.
#     - *Input*: "abc"
#     - *Output*: "['abc', 'acb', 'bac', 'bca', 'cab', 'cba']"

s = "abc"

def permute_string(s):
    if len(s) == 0:
        return ['']

    result = []
    for i in range(len(s)):
        remaining = s[:i] + s[i+1:]
        for perm in permute_string(remaining):
            result.append(s[i] + perm)
    return result


print(permute_string(s))  