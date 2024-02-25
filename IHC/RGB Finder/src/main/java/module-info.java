module color.rgb.rgb {
    requires javafx.controls;
    requires javafx.fxml;


    opens color.rgb.rgb to javafx.fxml;
    exports color.rgb.rgb;
}