package com.truthquest.model;

public class StoryScene {

    private int sceneNumber;
    private String narration;
    private String choice;
    private String truthOutcome;
    private String lieOutcome;

    public StoryScene() {
    }

    public StoryScene(int sceneNumber, String narration, String choice,
                      String truthOutcome, String lieOutcome) {
        this.sceneNumber = sceneNumber;
        this.narration = narration;
        this.choice = choice;
        this.truthOutcome = truthOutcome;
        this.lieOutcome = lieOutcome;
    }

    public int getSceneNumber() {
        return sceneNumber;
    }

    public void setSceneNumber(int sceneNumber) {
        this.sceneNumber = sceneNumber;
    }

    public String getNarration() {
        return narration;
    }

    public void setNarration(String narration) {
        this.narration = narration;
    }

    public String getChoice() {
        return choice;
    }

    public void setChoice(String choice) {
        this.choice = choice;
    }

    public String getTruthOutcome() {
        return truthOutcome;
    }

    public void setTruthOutcome(String truthOutcome) {
        this.truthOutcome = truthOutcome;
    }

    public String getLieOutcome() {
        return lieOutcome;
    }

    public void setLieOutcome(String lieOutcome) {
        this.lieOutcome = lieOutcome;
    }
}
