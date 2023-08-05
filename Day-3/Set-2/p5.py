l1 = ["M", "na", "i", "Ke"]
l2 = ["y", "me", "s", "lly"]

def add_lists_index_wise(list1, list2):
    res = []
    min = min(len(list1),len(list2))


    for i in range(min):
        res.append(list1[i] + list2[i])

    res.extend(list1[min:])
    res.extend(list2[min:])

    return res



ans  = add_lists_index_wise(l1,l2)
print(ans)