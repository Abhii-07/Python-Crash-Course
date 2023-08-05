# 1. **Selection Sort**: Implement the selection sort algorithm in Python.
#     - *Input*: [64, 25, 12, 22, 11]
#     - *Output*: "[11, 12, 22, 25, 64]"


arr = [64, 25, 12, 22, 11]

n = len(arr)
for i in range(n):
    min_index = i
    for j in range (i+1,n):
        if(arr[j] < arr[min_index]):
            min_index = j
    arr[i],arr[min_index] = arr[min_index], arr[i]

print(arr)