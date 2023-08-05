# ### Problem **10: Modify the tuple**

# Given a nested tuple. Write a program to modify the first item (22) of a list inside the following tuple to 222

tuple1 = (11, [22, 33], 44, 55)


list_tuple = list(tuple1)
list_tuple[1][0] = 222
print(list_tuple)