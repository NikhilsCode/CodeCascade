package com.tracker.tracker.entity.DTO;

public class BranchDTO {
    private Long id;
    private String branchName;
    public BranchDTO(Long id, String branchName) {
        this.id = id;
        this.branchName = branchName;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBranchName() { return branchName; }
    public void setBranchName(String branchName) { this.branchName = branchName; }

}
