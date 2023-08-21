from django.shortcuts import render
import json
from django.http import JsonResponse

# Create your views here.
posts = []


def create_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)      
        username = data.get('username')
        caption = data.get('caption')

        post = {
            'id' :len(posts) + 1,
            'username':username,
            'caption':caption
        }

        posts.append(post)

        return JsonResponse({"message" : "Post Created"},status = 201)
    
    return JsonResponse({"message" : "Post Not Created"},status = 400)
    

def view_post(request):
        
    return JsonResponse({"posts" : posts},status = 200)


def delete_post(request,post_id):
    post_id = int(post_id)
    post_index = None

    for index,post in enumerate(posts):
        if post['id'] == post_id:
            post_index = index
            break

    if post_index is not  None:
        del posts[post_index]
        return JsonResponse({'message' : "pOst Deleted"},status = 200)

    return JsonResponse({'message' : "pOst Not Deleted"},status = 404)


















    if(username and caption) :
        new_post = {'usename': username,'caption': caption}
        posts.append(new_post)
        return JsonResponse({"message" : "Post Created"})
    else:
        return JsonResponse({"message" : "Post Not Created"})