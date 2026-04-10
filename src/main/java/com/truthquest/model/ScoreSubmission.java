package com.truthquest.model;

import java.util.List;

public class ScoreSubmission {

    private String playerName;
    private List<Answer> answers;

    public ScoreSubmission() {
    }

    public ScoreSubmission(String playerName, List<Answer> answers) {
        this.playerName = playerName;
        this.answers = answers;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public static class Answer {

        private Long questionId;
        private int selectedOption;

        public Answer() {
        }

        public Answer(Long questionId, int selectedOption) {
            this.questionId = questionId;
            this.selectedOption = selectedOption;
        }

        public Long getQuestionId() {
            return questionId;
        }

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        public int getSelectedOption() {
            return selectedOption;
        }

        public void setSelectedOption(int selectedOption) {
            this.selectedOption = selectedOption;
        }
    }
}
