package com.editor.texteditor;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class HelloController {
    @FXML
    private TextArea t;
    @FXML
    private TextField word;
    @FXML
    private Label count;
    @FXML
    private CheckBox box;

    public void editor(ActionEvent event){
        int aux = 0;
        for(int i = 0; i < t.getText().length(); i++){
            if (t.getText().charAt(i) == word.getText().charAt(0) && i + word.getText().length() <= t.getText().length()){
                if (t.getText().substring(i, i + word.getText().length()).contains(word.getText())){
                    aux = aux + 1;
                }
            }
        }
        count.setText(String.valueOf(aux));
    }
}