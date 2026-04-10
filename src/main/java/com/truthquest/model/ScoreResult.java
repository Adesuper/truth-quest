package com.truthquest.model;

import java.util.List;

public class ScoreResult {

    private String playerName;
    private int totalQuestions;
    private int correctAnswers;
    private int scorePercent;
    private String message;
    private String encouragement;
    private BibleVerse verse;
    private List<QuestionFeedback> feedback;

    public ScoreResult() {
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getScorePercent() {
        return scorePercent;
    }

    public void setScorePercent(int scorePercent) {
        this.scorePercent = scorePercent;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEncouragement() {
        return encouragement;
    }

    public void setEncouragement(String encouragement) {
        this.encouragement = encouragement;
    }

    public BibleVerse getVerse() {
        return verse;
    }

    public void setVerse(BibleVerse verse) {
        this.verse = verse;
    }

    public List<QuestionFeedback> getFeedback() {
        return feedback;
    }

    public void setFeedback(List<QuestionFeedback> feedback) {
        this.feedback = feedback;
    }

    public static class QuestionFeedback {

        private Long questionId;
        private boolean correct;
        private String explanation;

        public QuestionFeedback() {
        }

        public QuestionFeedback(Long questionId, boolean correct, String explanation) {
            this.questionId = questionId;
            this.correct = correct;
            this.explanation = explanation;
        }

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public boolean isCorrect() {
            return correct;
        }

        public void setCorrect(boolean correct) {
            this.correct = correct;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }
    }
}
