import tkinter as tk
from tkinter import messagebox
import random
import pickle

SCORES_FILE = "scores.pkl"

def get_user_choice():
    user_choice = user_choice_var.get()
    return user_choice

def get_computer_choice():
    return random.choice(['rock', 'paper', 'scissors'])

def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "draw"
    elif user_choice == 'rock' and computer_choice == 'scissors':
        return "user"
    elif user_choice == 'scissors' and computer_choice == 'paper':
        return "user"
    elif user_choice == 'paper' and computer_choice == 'rock':
        return "user"
    else:
        return "computer"

def update_score(user_wins, computer_wins, draws):
    user_wins_var.set(user_wins)
    computer_wins_var.set(computer_wins)
    draws_var.set(draws)

def on_choice():
    global user_wins, computer_wins, draws

    user_choice = get_user_choice()

    if user_choice == 'q':
        root.destroy()
        return

    computer_choice = get_computer_choice()
    computer_choice_var.set(computer_choice)

    winner = determine_winner(user_choice, computer_choice)
    if winner == 'user':
        user_wins += 1
    elif winner == 'computer':
        computer_wins += 1
    else:
        draws += 1

    update_score(user_wins, computer_wins, draws)
    save_scores(user_wins, computer_wins, draws)


def save_scores(user_wins, computer_wins, draws):
    scores = {
        'user_wins': user_wins,
        'computer_wins': computer_wins,
        'draws': draws,
    }
    with open(SCORES_FILE, 'wb') as file:
        pickle.dump(scores, file)

def load_scores():
    try:
        with open(SCORES_FILE, 'rb') as file:
            scores = pickle.load(file)
        return scores.get('user_wins', 0), scores.get('computer_wins', 0), scores.get('draws', 0)
    except FileNotFoundError:
        return 0, 0, 0

# Initialize tkinter
root = tk.Tk()
root.title("Rock, Paper, Scissors Game")

# Load scores
user_wins, computer_wins, draws = load_scores()

# Variables for storing choices and scores
user_choice_var = tk.StringVar()
computer_choice_var = tk.StringVar()
user_wins_var = tk.IntVar(value=user_wins)
computer_wins_var = tk.IntVar(value=computer_wins)
draws_var = tk.IntVar(value=draws)

# Label to display choices and score
user_choice_label = tk.Label(root, text="Your Choice:")
user_choice_label.pack()
user_choice_entry = tk.Entry(root, textvariable=user_choice_var)
user_choice_entry.pack()

computer_choice_label = tk.Label(root, text="Computer's Choice:")
computer_choice_label.pack()
computer_choice_entry = tk.Entry(root, textvariable=computer_choice_var, state="disabled")
computer_choice_entry.pack()

score_label = tk.Label(root, text="Score:")
score_label.pack()
score_frame = tk.Frame(root)
score_frame.pack()
user_wins_label = tk.Label(score_frame, text="User wins:")
user_wins_label.pack(side=tk.LEFT)
user_wins_entry = tk.Entry(score_frame, textvariable=user_wins_var, state="disabled")
user_wins_entry.pack(side=tk.LEFT)

computer_wins_label = tk.Label(score_frame, text="Computer wins:")
computer_wins_label.pack(side=tk.LEFT)
computer_wins_entry = tk.Entry(score_frame, textvariable=computer_wins_var, state="disabled")
computer_wins_entry.pack(side=tk.LEFT)

draws_label = tk.Label(score_frame, text="Draws:")
draws_label.pack(side=tk.LEFT)
draws_entry = tk.Entry(score_frame, textvariable=draws_var, state="disabled")
draws_entry.pack(side=tk.LEFT)

# Button to make a choice
choice_button = tk.Button(root, text="Make Choice", command=on_choice)
choice_button.pack()

# Start the main event loop
root.mainloop()
