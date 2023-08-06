# 7. **Climbing Stairs**: You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
#     - *Input*: 3
#     - *Output*: "3"

def climb_stairs(n):
    if n == 1:
        return 1
    first, second = 1, 2
    for _ in range(3, n + 1):
        first, second = second, first + second
    return second

n = 5
print(climb_stairs(n)) 