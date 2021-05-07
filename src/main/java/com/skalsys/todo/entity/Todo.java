package com.skalsys.todo.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity //das ist eine Tabelle
@NoArgsConstructor //build Constructor
@Setter //set private info
@Getter //get private info
public class Todo {
    @Column(name="id") // Zeilen name zuweisen
    @GeneratedValue // generiert id automatisch -> unique id
    @Id // nur auf nächste Zeile angewendet
    private int id;

    private String description;

    private String date;

    private int progress;


}
