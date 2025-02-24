package com.tracker.tracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "branch")
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "BRANCH_NAME", nullable = false, unique = true)
    private String branchName;

    // Default constructor required by JPA
    public Branch() {}

    public Branch(String branchName) {
        this.branchName = branchName;
    }
    public Branch(Long id ,String branchName) {
        this.id = id;
        this.branchName = branchName;
    }

    public Long getId() {
        return id;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }
}

