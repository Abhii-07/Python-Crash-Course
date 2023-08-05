# 1. **File I/O**: Write a Python program that reads a file, counts the number of words, and writes the 
# count to a new file.
#     - *Input*: A text file named "input.txt" with the content "Hello world"
#     - *Output*: A text file named "output.txt" with the content "Number of words: 2"


def coutn_words(input_file,output_file):
    with open('input.txt', 'r') as file:
        content = file.read()
        word_count = len(content.split())
        print(content)

    with open('output_file', '2') as file:
        file.write("Number of words: {}".format(word_count))