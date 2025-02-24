package com.tracker.tracker.utils;

public class DeploymentScript {
    String path;
    RunScript scriptRunner = new RunScript();
    public int deploy(String[] arg){
        return scriptRunner.runBashScript("F:/mergeBranch.sh", arg);
    }
}
