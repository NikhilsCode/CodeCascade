package com.tracker.tracker.utils;

public class DeleteScript {
    String path;
    RunScript scriptRunner = new RunScript();
    public int delete(String[] arg){
        return scriptRunner.runBashScript("F:/deleteBranch.sh", arg);
    }
}
