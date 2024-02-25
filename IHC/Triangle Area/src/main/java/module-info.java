module com.ptheorem.pythagoreantheorem {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.triangle.trainglearea to javafx.fxml;
    exports com.triangle.trainglearea;
}