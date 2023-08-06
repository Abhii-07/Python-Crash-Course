# 6. **Missing Number**: Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
#     - *Input*: [3, 0, 1]
#     - *Output*: "2"

def find_missing_number(nums):
    n = len(nums)
    total_sum = (n * (n + 1)) // 2
    actual_sum = sum(nums)
    return total_sum - actual_sum

nums = [3, 0, 1,2,5]
print(find_missing_number(nums))  
