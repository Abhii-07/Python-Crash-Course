# ### Problem **4: Arrange string characters such that lowercase letters should come first**

# Given string contains a combination of the lower and upper case letters. Write a program to arrange the characters of a string so that all lowercase letters should come first.
str1 = "PyNaTive"
char_list = list(str1)
char_list.sort(key=str.isupper)
str2 = ''.join(char_list)
print(str2)