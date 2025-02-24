package com.tracker.tracker.entity.DTO;

public class BranchTimeDTO {
    private Long id;
    private String branchName;
    private  String timeStamp;
    public BranchTimeDTO(Long id, String branchName, String timeStamp) {
        this.id = id;
        this.branchName = branchName;
        this.timeStamp = timeStamp;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBranchName() { return branchName; }
    public void setBranchName(String branchName) { this.branchName = branchName; }

    public String getTimeStamp() { return timeStamp; }
    public void setTimeStamp(String timeStamp) { this.timeStamp = timeStamp; }
}

