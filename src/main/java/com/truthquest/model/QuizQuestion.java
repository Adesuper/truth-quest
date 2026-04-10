package com.truthquest.model;

import java.util.List;

public class QuizQuestion {

    private Long id;
    private String question;
    private List<String> options;
    private int correctAnswerIndex;
    private String explanation;
    private String bibleReference;

    public QuizQuestion() {
    }

    public QuizQuestion(Long id, String question, List<String> options,
                        int correctAnswerIndex, String explanation, String bibleReference) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
        this.explanation = explanation;
        this.bibleReference = bibleReference;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectAnswerIndex() {
        return correctAnswerIndex;
    }

    public void setCorrectAnswerIndex(int correctAnswerIndex) {
        this.correctAnswerIndex = correctAnswerIndex;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getBibleReference() {
        return bibleReference;
    }

    public void setBibleReference(String bibleReference) {
        this.bibleReference = bibleReference;
    }
}
