/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package diashowsettings;

import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Installer extends JFrame implements ActionListener {

    private Updater updater;
    private JPanel rootPanel;
    private String error;

    private JLabel infoLabel;
    private JTextField selectedPicturePath;
    private JTextField selectedInstallationPath;
    private JTextField selectLinkUrlPath;
    
    private String lastSelectedDir = System.getProperty("user.home");
    
    private static final String DEFAULT_NOT_SELECTION_PLACEHOLDER = "Bitte auswählen..";
    private static final String CHOOSE_PICTURE_PATH = "CHOOSE_PICTURE_PATH";
    private static final String CHOOSE_INSTALLATION_PATH = "CHOOSE_INSTALLATION_PATH";
    private static final String CHOOSE_URL_PATH = "CHOOSE_URL_PATH";
    private static final String UPDATE = "UPDATE";

    public Installer(String title) {
        super(title);
        
        this.initFields();
        this.setupGUI();
        
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setSize(600, 265);
        this.setMinimumSize(new Dimension(600, 265));
        this.setVisible(true);
    }

    private void initFields() {
        this.updater = new Updater();
        this.rootPanel = new JPanel();
        this.getContentPane().add(rootPanel);
        this.error = null;
        this.selectedPicturePath = new JTextField(DEFAULT_NOT_SELECTION_PLACEHOLDER);
        this.selectedInstallationPath = new JTextField(DEFAULT_NOT_SELECTION_PLACEHOLDER);
        this.selectLinkUrlPath = new JTextField(DEFAULT_NOT_SELECTION_PLACEHOLDER);
        this.infoLabel = new JLabel("error: -");
    }
    
    private void setupGUI() {
        this.rootPanel.setLayout(new GridLayout(4, 1));

        this.setupSelectionPanels();
        this.setupUpdatePanel();

    }

    private void setupUpdatePanel() {
        JPanel contentPane = new JPanel();
        
        JButton updateBtn = new JButton();
        updateBtn.setText("Let's go");
        updateBtn.setActionCommand(UPDATE);
        updateBtn.addActionListener(this);
        
        contentPane.add(updateBtn);
        contentPane.add(this.infoLabel);
        
        this.rootPanel.add(contentPane);
     
    }
    
    
    
    private void setupSelectionPanels() {

        String description = "Installations Ordner";
        String buttonText = "Ordner auswählen";
        String actionCommand = CHOOSE_INSTALLATION_PATH;
        this.rootPanel.add(this.createSelectFolderPanel(this.selectedInstallationPath, description, buttonText, actionCommand));

        description = "Bild Source Ordner";
        actionCommand = CHOOSE_PICTURE_PATH;
        this.rootPanel.add(this.createSelectFolderPanel(this.selectedPicturePath, description, buttonText, actionCommand));
        
        description = "Datei die Links enthält";
        actionCommand = CHOOSE_URL_PATH;
        this.rootPanel.add(this.createSelectFolderPanel(this.selectLinkUrlPath, description, buttonText, actionCommand));

    }

    private void setPicturePath(String picturePath) {
        this.selectedPicturePath.setText(picturePath);
        this.updater.setPicturePath(picturePath);
    }

    private void setInstallationPath(String installPath) {
        this.selectedInstallationPath.setText(installPath);
        this.updater.setInstallationPath(installPath);
    }
    
    private void setUrlFilePath(String urlPath) {
        this.selectLinkUrlPath.setText(urlPath);
        this.updater.setUrlFilePath(urlPath);
    }

    private JPanel createSelectFolderPanel(JTextField leftDisplayField, String description, String buttonText, String actionCommand) {

        JPanel contentPane = new JPanel();  
        JPanel leftPanel = new JPanel();
        JPanel rightPanel = new JPanel();

        JButton selectBtn = new JButton();
        selectBtn.setActionCommand(actionCommand);
        selectBtn.setText(buttonText);
        selectBtn.addActionListener(this);

        leftDisplayField.setEditable(false);
      //  leftDisplayField.setSize(315, 40);
        leftPanel.add(leftDisplayField);

        rightPanel.add(new JLabel(description));
        rightPanel.add(selectBtn);

        contentPane.add(leftPanel);
        contentPane.add(rightPanel);

        return contentPane;
    }

    private void displayError() {
        System.out.println("Displaying error: "+ this.error);
        this.infoLabel.setText("error: " + this.error);
    }
    
    private boolean isError() {
        return this.error.length() != 0;
    }
    
    private void updateError() {
        String err = "";
        if(this.selectedInstallationPath.getText().equals(DEFAULT_NOT_SELECTION_PLACEHOLDER)) {
            err += "Kein Installationsordner ausgewählt\n";
        }
        if(this.selectedPicturePath.getText().equals(DEFAULT_NOT_SELECTION_PLACEHOLDER)) {
            if(err.length() > 0) {
                err += " und k";
            } else err += "K";
            err += "ein Bild Ordner ausgewählt";
        }
        System.out.println("this.err = " + err);
        this.error = err;
    }
   
    
    private String chooseFile(String dialogTitle) {
        JFileChooser chooser = new JFileChooser();
        chooser.setCurrentDirectory(new java.io.File(this.lastSelectedDir));
        chooser.setDialogTitle(dialogTitle);
      //  chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);

        //chooser.setAcceptAllFileFilterUsed(true);
 
        if (chooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) {
            if(chooser.getSelectedFile().getParent() != null) {
                this.lastSelectedDir = chooser.getSelectedFile().getParent();
            }
            return chooser.getSelectedFile().toString();
        } else {
            return "";
        }
    }
    
    private String chooseDirectory(String dialogTitle) {
        JFileChooser chooser = new JFileChooser();
        chooser.setCurrentDirectory(new java.io.File(this.lastSelectedDir));
        chooser.setDialogTitle(dialogTitle);
        chooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);

        chooser.setAcceptAllFileFilterUsed(false);
 
        if (chooser.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) {
            if(chooser.getSelectedFile().getParent() != null) {
                this.lastSelectedDir = chooser.getSelectedFile().getParent();
            }
            return chooser.getSelectedFile().toString();
        } else {
            return "";
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        System.out.println("Action event");
        if (e.getActionCommand().equals(CHOOSE_PICTURE_PATH)) {
            String selection = this.chooseDirectory("Bilder Ordner auswählen.");
            if (selection.length() > 0) {
                this.setPicturePath(selection);
            }
        } else if (e.getActionCommand().equals(CHOOSE_INSTALLATION_PATH)) {
            String selection = this.chooseDirectory("Installations Ordner auswählen.");
            if (selection.length() > 0) {
                this.setInstallationPath(selection);
            }
        } else if (e.getActionCommand().equals(CHOOSE_URL_PATH)) {
            String selection = this.chooseFile("Datei mit Urls angeben.");
            if (selection.length() > 0) {
                this.setUrlFilePath(selection);
            }
        } else if(e.getActionCommand().equals(UPDATE)) {
            System.out.println("UPDATE");
            this.updateError();
            if(!this.isError()) {
                this.updater.update();
            } else {
                this.displayError();
            }
        }
    }
}
