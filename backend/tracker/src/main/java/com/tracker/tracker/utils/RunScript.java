package com.tracker.tracker.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RunScript {

    public  int runBashScript(String scriptPath, String[] arguments  ) {

        try {

            List<String> command = new ArrayList<>();
            command.add("C:/Program Files/Git/bin/bash.exe");
            command.add("-c");
            StringBuilder Arg = new StringBuilder();
            Arg.append("bash").append(" ");
            Arg.append(scriptPath).append(" ");
            for (String argument : arguments) {
                Arg.append(argument).append(" ");
            }
            System.out.println(Arg.toString().trim());
            command.add(Arg.toString().trim());

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.inheritIO();


            Process process = processBuilder.start();
            int exitCode  = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Script executed successfully.");
            } else {
                System.out.println("Script execution failed.");
            }
            return  exitCode;

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return  1;
        }


    }
}
