# ### Problem **7: Iterate both lists simultaneously**

# Given a two Python list. Write a program to iterate both lists simultaneously and display 
# items from list1 in original order and items from list2 in reverse order.

list1 = [10, 20, 30, 40]
list2 = [100, 200, 300, 400]

i = 0
j = len(list2) - 1

while i< len(list1) and j >= 0:
    print(list1[i],list2[j])
    i+=1
    j-=1

