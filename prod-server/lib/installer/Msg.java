
package diashowsettings;

import javax.swing.JOptionPane;

public class Msg
{

    public static void show(String infoMessage, String titleBar)
    {
        JOptionPane.showMessageDialog(null, infoMessage, titleBar, JOptionPane.INFORMATION_MESSAGE);
    }
}