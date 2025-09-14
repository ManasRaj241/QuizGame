package com.quizapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "topics")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;   // e.g. "general", "science"

    @Column(nullable = false)
    private String name;   // e.g. "General Knowledge"

    private String description;
}
