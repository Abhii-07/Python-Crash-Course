# 1. **Palindrome Check**: Write a Python function that checks whether a given word or phrase is a palindrome.
#     - *Input*: "madam"
#     - *Output*: "The word madam is a palindrome."

str = "racecar"
if str == str[::-1]:
    print("The word", str, "is a palindrome.")
else:
    print(f'The word {str} is not a palindrome.')