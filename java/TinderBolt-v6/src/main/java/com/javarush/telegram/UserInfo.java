package com.javarush.telegram;

import java.util.ArrayList;

public class UserInfo {
    public static class Question {
        public final String text;
        public String answer = "";

        public Question(String text) {
            this.text = text;
        }

        @Override
        public String toString() {
            return text + ": " + answer;
        }
    }

    private final ArrayList<Question> questions;
    private int currentQuestionIndex = 0;

    public UserInfo(ArrayList<Question> questions) {
        this.questions = questions;
    }

    public boolean hasCurrentQuestion() {
        return currentQuestionIndex < questions.size();
    }

    public boolean hasNextQuestion() {
        return currentQuestionIndex + 1 < questions.size();
    }

    public String getCurrentQuestionText() {
        return questions.get(currentQuestionIndex).text;
    }

    public void setCurrentQuestionAnswer(String answer) {
        questions.get(currentQuestionIndex).answer = answer;
    }

    public void goToNextQuestion() {
        currentQuestionIndex++;
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        for (Question question : questions) {
            result.append(question.toString()).append("\n");
        }
        return result.toString();
    }
}
