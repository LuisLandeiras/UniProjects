package color.rgb.rgb;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.Slider;
import javafx.scene.layout.Pane;

public class HelloController {
    @FXML
    private Label red;
    @FXML
    private Label green;
    @FXML
    private Label blue;
    @FXML
    private Slider redslider;
    @FXML
    private Slider greenslider;
    @FXML
    private Slider blueslider;
    @FXML
    private Pane background;

    @FXML
    private void RGB(){
        int r = (int)redslider.getValue();
        int g = (int)greenslider.getValue();
        int b = (int)blueslider.getValue();

        redslider.setMax(255);
        greenslider.setMax(255);
        blueslider.setMax(255);

        red.setText(String.valueOf(redslider.getValue()));
        green.setText(String.valueOf(greenslider.getValue()));
        blue.setText(String.valueOf(blueslider.getValue()));

        String color = String.format("rgb(%d,%d,%d);", r,g,b);
        background.setStyle("-fx-background-color: "+color);
    }
}