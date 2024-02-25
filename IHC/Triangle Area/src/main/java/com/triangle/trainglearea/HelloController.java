package com.triangle.trainglearea;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class HelloController {
    @FXML
    private TextField a;
    @FXML
    private TextField b;
    @FXML
    private TextField c;
    @FXML
    private Label anwser;

    @FXML
    public void formula(ActionEvent event){
        int inta = Integer.parseInt(a.getText());
        int intb = Integer.parseInt(b.getText());
        int intc = Integer.parseInt(c.getText());
        if(inta <= 0 | intb <= 0 | intc <= 0 | inta > intb + intc | intb > inta + intc | intc > intb + inta){
            anwser.setText("\tError please put correct side sizes\t");
        }else{
            double aux = (inta + intb+ intc)/2;
            double result = Math.sqrt(aux*(aux-inta)*(aux-intb)*(aux-intc));
            anwser.setText(String.format("\t%.7f\t", result));
        }
    }
}