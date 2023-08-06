# 15. **Single Number**: Given a non-empty array of integers, every element appears twice except for one. Find that single one.
#     - *Input*: [4,1,2,1,2]
#     - *Output*: "4"



def find_single_number(nums):
    num_dict = {}
    for num in nums:
        if num in num_dict:
            num_dict[num] += 1
        else:
            num_dict[num] = 1

    for num, count in num_dict.items():
        if count == 1:
            return num


nums = [4, 1, 2, 1, 2]
print(find_single_number(nums))  
