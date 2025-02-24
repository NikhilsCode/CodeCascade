package com.tracker.tracker.utils;

public class BuildScript {

    String path;
    RunScript scriptRunner = new RunScript();
    public int build(String[] arg){
        return scriptRunner.runBashScript("F:/build.sh", arg);
    }
}
