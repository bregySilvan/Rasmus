/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package diashowsettings;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;

import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.ArrayList;


/**
 *
 * @author bregy
 */
public class Updater {

    private String picturePath = "";
    private String urlFilePath = "";
    private String installPath = "";

    private final String ROOT_DIR_NAME = "prod-server";
    //private final String NODE_MODULES_INSTALLER_NAME = ROOT_DIR_NAME + "\\install_node_modules.bat";
    private final String NODE_MODULES_INSTALLER_NAME = ROOT_DIR_NAME + "\\install_node_modules.bat";
    private final String RELATIVE_CONFIG_PATH = ROOT_DIR_NAME+"\\prod-server.conf.ts";

    private final String SOURCE_FOLDER_NAME = "diashow";

    private final String DEFAULT_CONFIG_CONTENT = ""
            + //  + "export const SOURCE_FOLDER_PATH: string = 'D:/pictures';\n" +
            "export const PICTURE_CHANGE_INTERVAL_MS: number = 4000;\n"
            + "export const UPDATE_PICTURE_ROUTES_CLIENT = 20 *1000;\n"
            + "export const UPDATE_STEINBOCK_PICTURE_SERVER = 4 * 60 * 1000;\n"
            + "export const DEFAULT_PORT = 5001;\n"
            + "export const FULL_SITE_ADDRESSES: string[] = [\n"
            + "   // 'https://www.google.com/'\n"
            + "];\n";

    private boolean isDir(String path) {
        return new File(path).isDirectory();
    }

    private boolean isFile(String path) {
        return new File(path).isFile();
    }

    public void setPicturePath(String picturePath) {
        this.picturePath = picturePath;
    }

    public void setInstallationPath(String installPath) {
        this.installPath = installPath;
    }

    public void setUrlFilePath(String urlFilePath) {
        this.urlFilePath = urlFilePath;
    }

    public List<String> getSetUrls() {
        return new ArrayList();
    }

    private boolean isSteinbockUrl(String url) {
        return url.toUpperCase().contains("HTTPS://STEINBOCK77.CH");
    }

    private List<String> readFileLines(String path) {
        List<String> lines = new ArrayList();
        try (BufferedReader br = new BufferedReader(new FileReader(path))) {
            while (br.ready()) {
                String line = br.readLine().trim();
                if (line.length() > 0) {
                    lines.add(line);
                }
            }
        } catch (Exception e) {
            System.out.println("Exception when reading file: " + path + "\n" + e.getMessage());
        }
        return lines;
    }

    public void copyFolderRec(File src, File dest) throws IOException {
        for(File file : src.listFiles()) {
            if(file.isDirectory()) {
                File destFolder = dest.toPath().resolve(file.getName()).toFile();
                if(!destFolder.exists()) {
                    destFolder.mkdir();
                }
                this.copyFolderRec(file, dest.toPath().resolve(file.getName()).toFile());
            } else if(file.isFile()) {
                 Files.copy(file.toPath(), dest.toPath().resolve(file.getName()), StandardCopyOption.REPLACE_EXISTING);
            }
        }
    }

    private void writeFile(String path, String content) throws IOException {
        Files.write(Paths.get(path), content.getBytes());

    }

    private void runCliCommand(String command) throws IOException, InterruptedException {
        final Process p = Runtime.getRuntime().exec(command);

        new Thread(new Runnable() {
            @Override
            public void run() {
                BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
                String line = null;

                try {
                    while ((line = input.readLine()) != null) {
                        System.out.println(line);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        p.waitFor();
    }

    public void update() {
        String configContents = DEFAULT_CONFIG_CONTENT;

        // build STEINBOCK_SITES array for config
        List<String> urls = this.readFileLines(this.urlFilePath);
        configContents += "export const STEINBOCK_SITES: string[] = [\n";
        for (int i = 0; i < urls.size() - 1; i++) {
            if (this.isSteinbockUrl(urls.get(i))) {
                configContents += urls.get(i) + ",\n";
            }
        }
        if (urls.size() > 0) {
            configContents += urls.get(urls.size() - 1) + "\n";
            System.out.println("URL after replacing:: " + urls.get(urls.size() - 1).replaceAll("/\\/", "/"));
        }
        configContents += "];\n";

        // add picture src path-.
        configContents += "export const SOURCE_FOLDER_PATH: string = '" + this.picturePath + "'\n";

        // do installation with with exit if anything fails. User is Informed!
        File installFolder = new File(this.installPath);
        try {
            
            
            // copy sources
            System.out.println("copying srces");
            this.copyFolderRec(new File(SOURCE_FOLDER_NAME), new File(this.installPath));
            
            // write config with settings
            this.writeFile(installFolder.toPath().resolve(RELATIVE_CONFIG_PATH).toString(), configContents.replaceAll("/\\/", "/"));
            
          //  String npmInstaller = this.installPath + "\\"+NODE_MODULES_INSTALLER_NAME;

            // install node_modules via external file.

         //  this.runCliCommand(npmInstaller);
            
            
        } catch (Exception io) {
            Msg.show("Installation failed due to:\n"+""
                     + "----------------------------------------------------------------------------\n"
                     + io.getMessage()+"\n"
                     + "----------------------------------------------------------------------------", "Oh No :(");
            return;
        }
 
        Msg.show("Installation successfully completed", "Yay :)");
        
    }
}
