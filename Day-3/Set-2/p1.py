# Write a program to print the following number pattern using a loop.

rows = 5

for i in range(1, rows+1):
    for j in range(1, i+1):
        print(j, end=' ')
    print()