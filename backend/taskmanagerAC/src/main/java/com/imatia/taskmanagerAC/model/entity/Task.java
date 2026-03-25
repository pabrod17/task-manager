package com.imatia.taskmanagerAC.model.entity;


import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "TASK")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "NAME", nullable = false, length = 50)
    private String name;
    @Column(name = "TEXT", nullable = false, length = 250)
    private String text;
    @Column(name = "CREATION_DATE")
    private Timestamp creationDate;
    @Column(name = "ENDING_DATE")
    private Timestamp endingDate;
    @Column(name = "COMPLETED")
    private Boolean completed;

    public Task() {}

    public Task(Long id, String name, String text, Timestamp creationDate, Timestamp endingDate, Boolean completed) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.creationDate = creationDate;
        this.endingDate = endingDate;
        this.completed = completed;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Timestamp getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Timestamp creationDate) {
        this.creationDate = creationDate;
    }

    public Timestamp getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(Timestamp endingDate) {
        this.endingDate = endingDate;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
