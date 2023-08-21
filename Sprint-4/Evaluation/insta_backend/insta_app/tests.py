from django.test import TestCase
from django.urls import reverse
import json

# Create your tests here.

class TestCaseInsta(TestCase):

    def create_post_testcase(self):
        data = {
            'username' : 'demo',
            'caption' : 'demo'
        }

        response = self.client.post(reverse('create_post')),json.dumps(data)
        self.assertEqual(response.status_code,201)
        self.assertEqual(len(json.loads(response.content)),1)

    def view_post_testcase(self):
        response = self.client.get(reverse('view_post'))
        self.assertEqual(response.status_code,200)

    def delete_post_testcase(self):
        response = self.client.delete(reverse('delete_post'))
        self.assertEqual(response.status_code,200)

   


