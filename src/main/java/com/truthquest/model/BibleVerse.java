package com.truthquest.model;

public class BibleVerse {

    private String reference;
    private String text;

    public BibleVerse() {
    }

    public BibleVerse(String reference, String text) {
        this.reference = reference;
        this.text = text;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
