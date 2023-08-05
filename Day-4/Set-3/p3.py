# 1. **Two Sum Problem**: Given an array of integers and a target integer, find the two integers in the array 
# that sum to the target.
#     - *Input*: [2, 7, 11, 15], target = 9
#     - *Output*: "[0, 1]"

arr = [2, 7, 11, 15]
k = 9
def two_sum(arr,k):
    n = len(arr)

    for i in range(n):
        for j in range(i+1,n):
            if(arr[i] + arr[j] == k):
                return [i,j]
        return None
        


print(two_sum(arr,k))
