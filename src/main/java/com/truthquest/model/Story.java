package com.truthquest.model;

import java.util.List;

public class Story {

    private String title;
    private String introduction;
    private List<StoryScene> scenes;
    private List<BibleVerse> bibleVerses;
    private String moral;

    public Story() {
    }

    public Story(String title, String introduction, List<StoryScene> scenes,
                 List<BibleVerse> bibleVerses, String moral) {
        this.title = title;
        this.introduction = introduction;
        this.scenes = scenes;
        this.bibleVerses = bibleVerses;
        this.moral = moral;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public List<StoryScene> getScenes() {
        return scenes;
    }

    public void setScenes(List<StoryScene> scenes) {
        this.scenes = scenes;
    }

    public List<BibleVerse> getBibleVerses() {
        return bibleVerses;
    }

    public void setBibleVerses(List<BibleVerse> bibleVerses) {
        this.bibleVerses = bibleVerses;
    }

    public String getMoral() {
        return moral;
    }

    public void setMoral(String moral) {
        this.moral = moral;
    }
}
